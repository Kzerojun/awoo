package com.awoo.pet.ui.web;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    @PostMapping
    public String registerPet(){

        return "Registered Pet";
    }
}
