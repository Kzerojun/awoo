package com.awoo.pet.ui.web;

import com.awoo.pet.support.ApiUtils;
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
    public ApiUtils.ApiResult<RegisterPetResponse>  registerPet(@RequestHeader("X-User-Id") Integer memberId, @RequestBody RegisterPetRequest request) {
        return ApiUtils.success(petServiceFacade.registerPet(request, memberId));
    }

    @GetMapping
    public ApiUtils.ApiResult<SearchPetListResponse> searchPetList(@RequestHeader("X-User-Id") Integer memberId){
        return ApiUtils.success(petServiceFacade.searchPetList(memberId));
    }

    @GetMapping("/{petId}")
    public ApiUtils.ApiResult<SearchPetResponse> searchPet(@PathVariable Integer petId) {
        return ApiUtils.success(petServiceFacade.searchPet(petId));
    }


    @PutMapping("/{petId}")
    public ApiUtils.ApiResult<ModifyPetResponse> modifyPet(@RequestHeader("X-User-Id") Integer memberId, @PathVariable Integer petId, @RequestBody ModifyPetRequest request) {
        return ApiUtils.success(petServiceFacade.modifyPet(request, petId , memberId));
    }


    @PostMapping("/{petId}/walks")
    public ApiUtils.ApiResult<RegisterWalkResponse> registerWalk(@RequestHeader("X-User-Id") Integer memberId, @PathVariable Integer petId, @RequestBody RegisterWalkRequest request){
        return ApiUtils.success(petServiceFacade.registerWalk(request, petId, memberId));
    }

    @GetMapping("/walks/{walkId}")
    public ApiUtils.ApiResult<SearchWalkResponse> searchWalk(@PathVariable Integer walkId){
        return ApiUtils.success(petServiceFacade.searchWalk(walkId));
    }

    @GetMapping("/{petId}/walks")
    public ApiUtils.ApiResult<SearchWalkListResponse> searchWalkListByPet(@PathVariable Integer petId){
        return ApiUtils.success(petServiceFacade.searchWalkListByPet(petId));
    }

    @GetMapping("/walks/member/{memberId}")
    public ApiUtils.ApiResult<SearchWalkListResponse> searchWalkListByMember(@PathVariable Integer memberId){
        return ApiUtils.success(petServiceFacade.searchWalkListByMember(memberId));
    }
}
