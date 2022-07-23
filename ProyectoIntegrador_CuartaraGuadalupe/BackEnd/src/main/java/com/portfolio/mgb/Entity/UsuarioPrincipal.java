package com.portfolio.mgb.Entity;

import com.portfolio.mgb.Security.Entity.Usuario;
import java.util.Collection;
import java.util.List;

/**
 *
 * @author guada
 */
public class UsuarioPrincipal implements UserDetails{
    private String nombre;
    private String nombreUsuario;
    private String email;
    private String passsword;
    private Collection<? extends GrantedAuthority> authorities;
    
    //Constructor

    public UsuarioPrincipal(String nombre, String nombreUsuario, String email, String passsword, Collection<? extends GrantedAuthority> authorities) {
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.passsword = passsword;
        this.authorities = authorities;
    }
    public static UsuarioPrincipal build(Usuario usuario){
        List<GrantedAuthority> authorities = usuario.getRoles().stream()
                .map(rol->new SimpleGrantedAuthority(rol.getRolNombre().name())).collect(Collectors
                        .toList());
    }
}
26min