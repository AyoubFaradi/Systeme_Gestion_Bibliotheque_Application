package com.bibliotheque.systeme_gestion_bibliotheque;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RootController {

    @GetMapping("/")
    public String redirectToIndex() {
        return "forward:/pages/index.html";
    }
}
