package com.example.irm2.recursosHumanos.token;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestControllerAdvice
public class TokenForGotpwd extends HandlerInterceptorAdapter {
    @Value("${FORGOT_TOKEN_SECRET}")
    private String FORGOT_TOKEN_SECRET;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Necesitas incluir el access_token en la cookie");
            return false;
        }

        String userToken = null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("forgot_token")) {
                userToken = cookie.getValue();
                break;
            }
        }

        if (userToken == null) {
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Necesitas incluir el forgot_token en la cookie");
            return false;
        }

        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(FORGOT_TOKEN_SECRET)
                    .parseClaimsJws(userToken)
                    .getBody();

            if (claims.getExpiration().getTime() < System.currentTimeMillis()) {
                sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "El token ha expirado");
                return false;

            } else {
                return true;
            }
        } catch (SignatureException e) {
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "El token es incorrecto");
            return false;
        }
    }

    private void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.getWriter().write(message);
    }
}
