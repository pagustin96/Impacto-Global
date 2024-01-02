package com.example.irm2.recursosHumanos.token;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestControllerAdvice
public class TokenMiddleware extends HandlerInterceptorAdapter {

    @Value("${ACCESS_TOKEN_SECRET}")
    private String ACCESS_TOKEN_SECRET;
    @Value("${REFRESH_TOKEN_SECRET}")
    private String REFRESH_TOKEN_SECRET;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            sendErrorResponse(response,HttpServletResponse.SC_UNAUTHORIZED, "Necesitas incluir el access_token en la cookie");
            return false;
        }

        Object[] result = obtenerToken(cookies);
        String requestUrl = request.getRequestURI();
        String userToken = result[0].toString();
        Boolean isAccessToken = (boolean) result[1];



        if (userToken == null) {
            sendErrorResponse(response,HttpServletResponse.SC_UNAUTHORIZED, "Necesitas incluir el access_token en la cookie");
            return false;
        } else if (isAccessToken) {
            try {
                Claims claims = Jwts.parser()
                        .setSigningKey(ACCESS_TOKEN_SECRET)
                        .parseClaimsJws(userToken)
                        .getBody();

                if (claims.getExpiration().getTime() < System.currentTimeMillis()) {
                    sendErrorResponse(response,HttpServletResponse.SC_UNAUTHORIZED, "El token ha expirado");
                    return false;
                }
                // Verificar el rol del usuario
                String role = claims.get("role", String.class);
                if ("admin".equals(role)) {
                    return true; // Permite acceso completo para administradores
                } else if ("user".equals(role)) {
                    if (!requestUrl.contains("/admin")) {
                        return true;
                    } else {
                        sendErrorResponse(response, HttpServletResponse.SC_FORBIDDEN, "No tienes permisos para acceder a este recurso");
                        return false;
                    }

                } else {
                    sendErrorResponse(response,HttpServletResponse.SC_UNAUTHORIZED, "Rol desconocido en el token");
                    return false;
                }
            } catch (SignatureException e) {
                sendErrorResponse(response,HttpServletResponse.SC_UNAUTHORIZED, "El token es incorrecto");
                return false;
            }
        }else {
            try {
                Claims claims = Jwts.parser()
                        .setSigningKey(REFRESH_TOKEN_SECRET)
                        .parseClaimsJws(userToken)
                        .getBody();

                if (claims.getExpiration().getTime() < System.currentTimeMillis()) {
                    sendErrorResponse(response,HttpServletResponse.SC_UNAUTHORIZED, "El token ha expirado");
                    return false;
                }
                // Verificar el rol del usuario
                String role = claims.get("role", String.class);
                if ("admin".equals(role)) {
                    return true; // Permite acceso completo para administradores
                } else if ("user".equals(role)) {
                    if (!requestUrl.contains("/admin")) {
                        return true;
                    } else {
                        sendErrorResponse(response, HttpServletResponse.SC_FORBIDDEN, "No tienes permisos para acceder a este recurso");
                        return false;
                    }

                } else {
                    sendErrorResponse(response,HttpServletResponse.SC_UNAUTHORIZED, "Rol desconocido en el token");
                    return false;
                }
            } catch (SignatureException e) {
                sendErrorResponse(response,HttpServletResponse.SC_UNAUTHORIZED, "El token es incorrecto");
                return false;
            }
        }


    }

    private void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.getWriter().write(message);
    }
    public Object[] obtenerToken(Cookie[] cookies) {
        String token = null;
        boolean access = false;

        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("access_token")) {
                token = cookie.getValue();
                access = true;
                break;
            } else if (cookie.getName().equals("refresh_token")) {
                token = cookie.getValue();
                access = true;
                break;
            }
        }
        return new Object[]{token, access};
    }

}