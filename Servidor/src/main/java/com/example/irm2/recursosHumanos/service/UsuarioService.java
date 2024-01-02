package com.example.irm2.recursosHumanos.service;

import com.example.irm2.recursosHumanos.exception.UsuarioNotFoundException;
import com.example.irm2.recursosHumanos.model.Reclutadoras;
import com.example.irm2.recursosHumanos.model.Usuarios;
import com.example.irm2.recursosHumanos.repository.UsuariosRepository;
import com.example.irm2.recursosHumanos.repository.ReclutadorasResository;
import com.example.irm2.recursosHumanos.service.EmailSender.EmailSenderService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service("usuarioService")
@Transactional
public class UsuarioService {

    private final UsuariosRepository usuarioRepository;
    private EmailSenderService emailSenderService;
    private ReclutadorasResository reclutadorasResository;
    @Autowired
    public UsuarioService(UsuariosRepository usuariosRepository, ReclutadorasResository reclutadorasResository) {
        this.usuarioRepository = usuariosRepository;
        this.reclutadorasResository = reclutadorasResository;
    }
    @Autowired
    public void setEmailSenderService(EmailSenderService emailSenderService) {
        this.emailSenderService = emailSenderService;
    }

    /* ------------------------------ FIND ----------------------------- */
    public List<Usuarios> findAllUsuarios(){
        return usuarioRepository.findAll();
    }
    public List<Usuarios> findAllUsuariosA(){
        return usuarioRepository.findAllByActivo(true);
    }
    public List<Usuarios> findAllUsuariosB(){
        return usuarioRepository.findAllByActivo(false);
    }
    public Optional<Usuarios> findUsuarioById(Long id) {
        return Optional.ofNullable(usuarioRepository.findById(id)
                    .orElseThrow(() -> new UsuarioNotFoundException(id)));
    }

    public Usuarios findUsuarioByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    /* ------------------------------ CREATE ----------------------------- */
    public ResponseEntity addUsuario(Usuarios usuario, Reclutadoras reclutadora) {
        try {
            Usuarios usuarioEmail = usuarioRepository.findByEmail(usuario.getEmail());
            if (usuarioEmail != null) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("El email ya existe");
            } else {
                //RECLUTADORA
                reclutadora.setEmail(usuario.getEmail());
                reclutadora.setActivo(true);
                reclutadorasResository.save(reclutadora);
                //USUARIO
                usuario.setActivo(true);
                String hashpwd = Cript(usuario.getPwd());
                usuario.setPwd(hashpwd);
                usuarioRepository.save(usuario);
                emailSenderService.sendEmail(usuario.getEmail(), "Nueva Cuenta Ar IRM", "Se ha creado una nueva cuenta con este correo electronico");
                return ResponseEntity.ok("Usuario creado con exito");
            }
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e);
        }

    }

    /* ------------------------------ DELETE ----------------------------- */
    public ResponseEntity deleteUsuario(Long id) {
        try {
            Optional<Usuarios> deletedUsuarioOptional = usuarioRepository.findById(id);
            if (deletedUsuarioOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El usuario no se ha encontrado");
            } else {
                Usuarios deletedUsuario = deletedUsuarioOptional.get();
                deletedUsuario.setActivo(false);
                usuarioRepository.save(deletedUsuario);
                return ResponseEntity.status(HttpStatus.OK).body("El usuario se dio de baja con éxito");
            }
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e);
        }

    }
    /* ------------------------------ UPDATE ----------------------------- */
    public Optional<Usuarios> updateUsuarioAdmin(Usuarios newUsuario, Long id) {
        Optional<Usuarios> updatedUsuario = usuarioRepository.findById(id);
        if ((updatedUsuario.isEmpty())) throw new UsuarioNotFoundException(id);
        else {
            return updatedUsuario.map(usuario -> {
                usuario.setEmail(newUsuario.getEmail());
                usuario.setPwd(Cript(newUsuario.getPwd()));
                return usuarioRepository.save(usuario);
            });
        }
    }
    public Optional<Usuarios> updateUsuario(Usuarios newUsuario, Long id) {
        Optional<Usuarios> updatedUsuario = usuarioRepository.findById(id);
        if ((updatedUsuario.isEmpty())) throw new UsuarioNotFoundException(id);
        else {
            return updatedUsuario.map(usuario -> {
                usuario.setEmail(newUsuario.getEmail());
                return usuarioRepository.save(usuario);
            });
        }
    }
    public boolean updatePwd(Long id, String pwd) {
        Optional<Usuarios> updatedUsuario = usuarioRepository.findById(id);
        if ((updatedUsuario.isEmpty())) {
            return false;
        }
        else {
            Usuarios updateUsu = updatedUsuario.get();
            System.out.println(pwd + " " + Cript(pwd) + " " + BCrypt.checkpw(pwd,Cript(pwd)));
            updateUsu.setPwd(Cript(pwd));
            System.out.println(BCrypt.checkpw(pwd,updateUsu.getPwd()));
            usuarioRepository.save(updateUsu);
            return true;
            }

    }


    /*------------------------------LOGIN--------------------------------*/
    public ResponseEntity verifyEmail(String email) {
        try {
            Usuarios usuario = findUsuarioByEmail(email);
            if (usuario != null) {
                if (usuario.getActivo().equals(true)) {
                    return ResponseEntity.status(HttpStatus.OK).body("Mail verificado");
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El usuario no esta activo");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el usuario");
            }
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e);
        }

    }

    /*----------------------------ENCRIPTADO--------------------------*/
    public String Cript(String pass) {
        String salt = BCrypt.gensalt(10);
        String hashedPass = BCrypt.hashpw(pass, salt);
        return hashedPass;
    }

}
