package com.domain.project;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PasswordEncoderConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new PasswordEncoder() {
            @Override
            public String encode(CharSequence rawPassword) {
                //return rawPassword.toString();
                return BCrypt.hashpw(rawPassword.toString(), BCrypt.gensalt(4));

            }
            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                //return rawPassword.toString().equals(encodedPassword);
                return BCrypt.checkpw(rawPassword.toString(), encodedPassword);

            }
        };
    }
}