package com.example.irm2.recursosHumanos.controller.Others;

import com.example.irm2.recursosHumanos.model.Candidatos.Candidatos;
import com.example.irm2.recursosHumanos.model.Candidatos.CandidatosId;
import com.example.irm2.recursosHumanos.model.Vacantes.Vacantes;
import com.example.irm2.recursosHumanos.repository.CandidatosRepository;
import com.example.irm2.recursosHumanos.repository.VacantesRepository;
import com.example.irm2.recursosHumanos.token.TokenMiddleware;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/export")
public class ExportController implements WebMvcConfigurer {
    private final VacantesRepository vacantesRepository;
    private final CandidatosRepository candidatosRepository;
    private final TokenMiddleware tokenMiddleware;
    public ExportController(VacantesRepository vacantesRepository,
                            CandidatosRepository candidatosRepository, TokenMiddleware tokenMiddleware) {
        this.vacantesRepository = vacantesRepository;
        this.candidatosRepository = candidatosRepository;
        this.tokenMiddleware = tokenMiddleware;

    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenMiddleware).addPathPatterns("/export/**");
    }


    @PostMapping("/pdf/vacantes")
    public void exportToPdfVacantes(@RequestBody ArrayList<Vacantes> data, HttpServletResponse response)
            throws DocumentException, IOException {

        // Crear un nuevo documento PDF
        Document document = new Document(PageSize.A4.rotate(), 10f, 10f, 100f, 0f);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(document, baos);
        LocalDateTime today = LocalDateTime.now();

        // Agregar evento para el logo en la esquina superior derecha
        writer.setPageEvent(new PdfPageEventHelper() {
            public void onEndPage(PdfWriter writer, Document document) {
                try {
                    // Cargar el logo desde la carpeta "resources"
                    ClassPathResource logoResource = new ClassPathResource("descarga.jpg"); // Reemplaza con el nombre de tu logo
                    Image logo = Image.getInstance(IOUtils.toByteArray(logoResource.getInputStream()));

                    // Ajustar posición y tamaño del logo
                    logo.setAbsolutePosition(PageSize.A4.getWidth() - 100, PageSize.A4.getHeight() - 50);
                    logo.scaleAbsolute(80, 30);

                    writer.getDirectContent().addImage(logo);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });


        // Establecer el título del PDF
        document.addTitle("TABLA DE VACANTES || FECHA: " + today);

        // Abrir el documento
        document.open();

        // Crear la tabla y configurarla
        PdfPTable table = new PdfPTable(10);
        table.setWidthPercentage(100);

        // Crear un objeto Font personalizado para los encabezados
        com.itextpdf.text.Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.RED);
        headerFont.setColor(BaseColor.RED);

        // Agregar encabezados de tabla
        String[] headers = {"ID", "Fecha inicio", "Fecha cierre", "Vacante", "Skills", "Rate", "País", "Cantidad", "Idioma", "Estado"};

        for (String header : headers) {
            PdfPCell headerCell = new PdfPCell(new Phrase(header, headerFont));
            headerCell.setBackgroundColor(BaseColor.WHITE);
            headerCell.setPadding(5);
            table.addCell(headerCell);
        }

        // Agregar filas de datos
        for (Vacantes row : data) {
            // Suponiendo que cada fila del mapa contiene las propiedades necesarias

            Long id = row.getId();
            table.addCell(String.valueOf(id)); // Utiliza longValue() para obtener el valor como long
            table.addCell(String.valueOf(row.getComienzo()));
            table.addCell(String.valueOf(row.getCierre()));
            table.addCell(String.valueOf(row.getNombre()));
            table.addCell(String.valueOf(row.getSkills()));
            table.addCell(String.valueOf(row.getRate()));
            Long idCompania = row.getIdCompania();
            if (idCompania == null) {
                table.addCell("Argentina");
            } else {
                table.addCell(String.valueOf(vacantesRepository.findPaisExterior(idCompania)));
            }
            table.addCell(String.valueOf(row.getCantidad()));
            Long idIdioma = row.getIdIdioma();
            table.addCell(String.valueOf(vacantesRepository.findNombreIdioma(idIdioma)));
            Long estado = vacantesRepository.findEstadoVacante(id.longValue());
            if (estado.intValue() == 0) {
                table.addCell("Activa");
            } else if (estado.intValue() == 1) {
                table.addCell("Cancelada");
            } else {
                table.addCell("Finalizada");
            }
        }

        // Agregar la tabla al documento
        document.add(table);

        // Cerrar el documento
        document.close();

        // Configurar la respuesta HTTP
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "inline; filename=vacantes.pdf");

        // Enviar el archivo PDF al cliente
        response.getOutputStream().write(baos.toByteArray());
        response.getOutputStream().flush();
    }


    @PostMapping("/excel/vacantes")
    public void exportToExcelVacantes(@RequestBody ArrayList<Vacantes> data, HttpServletResponse response) throws IOException {
        // Crear un nuevo libro de Excel (formato XLSX)
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Datos");

        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setColor(IndexedColors.BLUE.getIndex());
        headerStyle.setFont(headerFont);
        // Crear una fila de encabezados con nombres de columnas
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("ID");
        headerRow.createCell(1).setCellValue("Fecha inicio");
        headerRow.createCell(2).setCellValue("Fecha cierre");
        headerRow.createCell(3).setCellValue("Vacante");
        headerRow.createCell(4).setCellValue("Skills");
        headerRow.createCell(5).setCellValue("Rate");
        headerRow.createCell(6).setCellValue("Pais");
        headerRow.createCell(7).setCellValue("Cantidad");
        headerRow.createCell(8).setCellValue("Idioma");
        headerRow.createCell(9).setCellValue("Estado");

        // Agregar filas de datos (reemplaza esto con tus datos reales)
        int rowNum = 1;
        for (Vacantes row : data) {
            Row dataRow = sheet.createRow(rowNum++);
            Long id = row.getId();
            dataRow.createCell(0).setCellValue(id);
            dataRow.createCell(1).setCellValue(String.valueOf(row.getComienzo()));
            dataRow.createCell(2).setCellValue(String.valueOf(row.getCierre()));
            dataRow.createCell(3).setCellValue(String.valueOf(row.getNombre()));
            dataRow.createCell(4).setCellValue(String.valueOf(row.getSkills()));
            dataRow.createCell(5).setCellValue(String.valueOf(row.getRate()));
            Long idCompania = row.getIdCompania();
            if (idCompania == null) {
                dataRow.createCell(6).setCellValue("Argentina");
            } else {
                dataRow.createCell(6).setCellValue(String.valueOf(vacantesRepository.findPaisExterior(idCompania.longValue())));
            }
            dataRow.createCell(7).setCellValue(String.valueOf(row.getCantidad()));
            Long idIdioma = row.getIdIdioma();
            dataRow.createCell(8).setCellValue(String.valueOf(vacantesRepository.findNombreIdioma(idIdioma)));
            Long estado = vacantesRepository.findEstadoVacante(id);
            if (estado == 0) {
                dataRow.createCell(9).setCellValue("Activa");
            } else if (estado == 1) {
                dataRow.createCell(9).setCellValue("Cancelada");
            } else {
                dataRow.createCell(9).setCellValue("Finalizada");
            }
        }

        // Configurar el tipo de respuesta HTTP y encabezados
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        response.setHeader("Content-Disposition", "attachment; filename=vacantes.xlsx");

        // Obtener el flujo de salida de la respuesta
        var outputStream = response.getOutputStream();

        // Escribir el libro de Excel en el flujo de salida
        workbook.write(outputStream);

        // Cerrar el libro y el flujo de salida
        workbook.close();
        outputStream.close();
    }

    @PostMapping("/pdf/candidatos")
    public void exportToPdfCandidatos(@RequestBody ArrayList<Candidatos> data, HttpServletResponse response)
            throws DocumentException, IOException {

        // Crear un nuevo documento PDF
        Document document = new Document(PageSize.A4.rotate(), 10f, 10f, 100f, 0f);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(document, baos);
        LocalDateTime today = LocalDateTime.now();

        // Agregar evento para el logo en la esquina superior derecha
        writer.setPageEvent(new PdfPageEventHelper() {
            public void onEndPage(PdfWriter writer, Document document) {
                try {
                    Image logo = Image.getInstance("C:/Users/Usuario/Downloads/descarga.jpg"); // Reemplaza con la ruta de tu logo
                    logo.setAbsolutePosition(PageSize.A4.getWidth() - 100, PageSize.A4.getHeight() - 50);
                    logo.scaleAbsolute(80, 30); // Ajusta el tamaño de tu logo
                    writer.getDirectContent().addImage(logo);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        // Establecer el título del PDF
        document.addTitle("TABLA DE CANDIDATOS - FECHA: " + today);

        // Abrir el documento
        document.open();

        // Crear la tabla y configurarla
        PdfPTable table = new PdfPTable(8);
        table.setWidthPercentage(100);

        // Crear un objeto Font personalizado para los encabezados
        com.itextpdf.text.Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.RED);
        headerFont.setColor(BaseColor.RED);

        // Agregar encabezados de tabla en negrita y rojo
        String[] headers = {"DNI", "País", "Nombre", "Apellido", "Perfil", "Seniority", "Expectativa Salarial", "Estado"};

        for (String header : headers) {
            PdfPCell headerCell = new PdfPCell(new Phrase(header, headerFont));
            headerCell.setBackgroundColor(BaseColor.WHITE);
            headerCell.setPadding(5);
            table.addCell(headerCell);
        }

        // Agregar filas de datos
        for (Candidatos row : data) {
            table.addCell(String.valueOf(row.getId().getDni()));

            String pais = candidatosRepository.findPais(row.getId().getIdPais());
            table.addCell(String.valueOf(pais));

            table.addCell(String.valueOf(row.getNombre()));
            table.addCell(String.valueOf(row.getApellido()));
            table.addCell(String.valueOf(row.getPerfil()));
            table.addCell(String.valueOf(row.getSeniority()));
            table.addCell(String.valueOf(row.getExpSalarial()));

            Long idEstado = candidatosRepository.findEstadoCandidato(
                    row.getId().getDni().intValue(),
                    row.getId().getIdPais().longValue()
            );
            String estado = candidatosRepository.findEstadoCandidatosString(idEstado);
            table.addCell(String.valueOf(estado));
        }

        // Agregar la tabla al documento
        document.add(table);

        // Cerrar el documento
        document.close();

        // Configurar la respuesta HTTP
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "inline; filename=candidatos.pdf");

        // Enviar el archivo PDF al cliente
        response.getOutputStream().flush();
    }
    @PostMapping("/excel/candidatos")
    public void exportToExcelCandidatos(@RequestBody ArrayList<Candidatos> data, HttpServletResponse response) throws IOException {
        // Crear un nuevo libro de Excel (formato XLSX)
        Workbook workbook = new XSSFWorkbook();

        // Crear una hoja en el libro
        Sheet sheet = workbook.createSheet("Candidatos");
        // Crear un estilo para el texto en negrita y azul
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setColor(IndexedColors.BLUE.getIndex());
        headerStyle.setFont(headerFont);
        // Crear una fila de encabezados
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Dni");
        headerRow.createCell(1).setCellValue("Pais");
        headerRow.createCell(2).setCellValue("Nombre");
        headerRow.createCell(3).setCellValue("Apellido");
        headerRow.createCell(4).setCellValue("Perfil");
        headerRow.createCell(5).setCellValue("Seniority");
        headerRow.createCell(6).setCellValue("Expectativa Salarial");
        headerRow.createCell(7).setCellValue("Estado");


        // Agregar filas de datos
        int rowNum = 1;
        for (Candidatos row : data) {
            Row dataRow = sheet.createRow(rowNum++);

            int dni = row.getId().getDni();
            long idPais = row.getId().getIdPais();
            String pais = candidatosRepository.findPais(idPais);
            String nombre = row.getNombre();
            String apellido = row.getApellido();
            String perfil = row.getPerfil();
            String seniority = row.getSeniority();
            Object expSalarialObj = row.getExpSalarial();
            String expSalarial = (expSalarialObj != null) ? expSalarialObj.toString() : "";

            Long idEstado = candidatosRepository.findEstadoCandidato(dni, idPais);
            String estado = candidatosRepository.findEstadoCandidatosString(idEstado);

            dataRow.createCell(0).setCellValue(dni);
            dataRow.createCell(1).setCellValue(pais);
            dataRow.createCell(2).setCellValue(nombre);
            dataRow.createCell(3).setCellValue(apellido);
            dataRow.createCell(4).setCellValue(perfil);
            dataRow.createCell(5).setCellValue(seniority);
            dataRow.createCell(6).setCellValue(expSalarial);
            dataRow.createCell(7).setCellValue(estado);
        }

        // Configurar el tipo de respuesta HTTP y encabezados
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        response.setHeader("Content-Disposition", "attachment; filename=candidatos.xlsx");

        // Obtener el flujo de salida de la respuesta
        OutputStream outputStream = response.getOutputStream();

        // Escribir el libro de Excel en el flujo de salida
        workbook.write(outputStream);

        // Cerrar el libro y el flujo de salida
        workbook.close();
        outputStream.close();
    }
}

