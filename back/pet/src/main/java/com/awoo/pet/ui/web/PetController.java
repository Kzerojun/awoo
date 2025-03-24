package com.awoo.pet.ui.web;

import com.awoo.pet.ui.facade.PetServiceFacade;
import com.awoo.pet.ui.facade.dto.request.ModifyPetRequest;
import com.awoo.pet.ui.facade.dto.request.RegisterPetRequest;
import com.awoo.pet.ui.facade.dto.request.RegisterWalkRequest;
import com.awoo.pet.ui.facade.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetServiceFacade petServiceFacade;

    @PostMapping
    public RegisterPetResponse registerPet(@RequestBody RegisterPetRequest request) {
        return petServiceFacade.registerPet(request, 2);
    }

    @GetMapping
    public SearchPetListResponse searchPetList(){
        return petServiceFacade.searchPetList(1);
    }

    @GetMapping("/{petId}")
    public SearchPetResponse searchPet(@PathVariable Integer petId) {
        return petServiceFacade.searchPet(petId);
    }


    @PutMapping("/{petId}")
    public ModifyPetResponse modifyPet(@PathVariable Integer petId, @RequestBody ModifyPetRequest request) {
        return petServiceFacade.modifyPet(request, petId , 1);
    }


    @PostMapping("/{petId}/walks")
    public RegisterWalkResponse registerWalk(@PathVariable Integer petId, @RequestBody RegisterWalkRequest request){
        return petServiceFacade.registerWalk(request, petId, 2);
    }

    @GetMapping("/walks/{walkId}")
    public SearchWalkResponse searchWalk(@PathVariable Integer walkId){
        return petServiceFacade.searchWalk(walkId);
    }

    @GetMapping("/{petId}/walks")
    public SearchWalkListResponse searchWalkListByPet(@PathVariable Integer petId){
        return petServiceFacade.searchWalkListByPet(petId);
    }

    @GetMapping("/walks/member/{memberId}")
    public SearchWalkListResponse searchWalkListByMember(@PathVariable Integer memberId){
        return petServiceFacade.searchWalkListByMember(memberId);
    }
}
