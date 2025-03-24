//package com.awoo.member.infra.jwt;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@Component
//@RequiredArgsConstructor
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//    private final JwtTokenProvider jwtTokenProvider;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain)
//            throws ServletException, IOException {
//
//        // 1. 헤더에서 토큰 추출
//        String authHeader = request.getHeader("Authorization");
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return; // 토큰이 없는 경우, 그냥 다음 필터로 넘어감
//        }
//
//        String token = authHeader.substring(7); // "Bearer " 이후 부분만 추출
//
//        // 2. 토큰 검증
//        if (jwtTokenProvider.validateToken(token)) {
//            // 3. 토큰에서 사용자 정보 추출
//            String memberId = jwtTokenProvider.getSubject(token);
//            String email = jwtTokenProvider.getEmail(token);
//
//            // 4. 필요한 경우 DB 조회를 통해 UserDetails 생성 가능
//            //    이 예시에서는 간단히 memberId, email만 Principal로 저장
//            UsernamePasswordAuthenticationToken authentication =
//                    new UsernamePasswordAuthenticationToken(memberId, null, null);
//
//            // 5. SecurityContext에 인증객체 등록
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        }
//
//        // 6. 다음 필터로 진행
//        filterChain.doFilter(request, response);
//    }
////}