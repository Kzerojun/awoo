package com.awoo.pet.ui.web;

import com.awoo.pet.ui.facade.PetServiceFacade;
import com.awoo.pet.ui.facade.dto.request.ModifyPetRequest;
import com.awoo.pet.ui.facade.dto.request.RegisterPetRequest;
import com.awoo.pet.ui.facade.dto.response.ModifyPetResponse;
import com.awoo.pet.ui.facade.dto.response.RegisterPetResponse;
import com.awoo.pet.ui.facade.dto.response.SearchPetResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetServiceFacade petServiceFacade;

    @PostMapping
    public RegisterPetResponse registerPet(@RequestBody RegisterPetRequest request) {
        return petServiceFacade.registerPet(request, 1);
    }

    @GetMapping("/{petId}")
    public SearchPetResponse searchPet(@PathVariable Integer petId) {
        System.out.println("호출");
        return petServiceFacade.searchPet(petId);
    }


    @PutMapping("/{petId}")
    public ModifyPetResponse modifyPet(@PathVariable Integer petId, @RequestBody ModifyPetRequest request) {
        return petServiceFacade.modifyPet(request, petId , 1);
    }


}
