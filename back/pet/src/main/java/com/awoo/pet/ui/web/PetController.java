package com.awoo.pet.ui.web;

import com.awoo.pet.support.ApiUtils;
import com.awoo.pet.ui.facade.PetServiceFacade;
import com.awoo.pet.ui.facade.dto.request.ModifyPetRequest;
import com.awoo.pet.ui.facade.dto.request.RegisterPetRequest;
import com.awoo.pet.ui.facade.dto.request.RegisterWalkRequest;
import com.awoo.pet.ui.facade.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetServiceFacade petServiceFacade;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiUtils.ApiResult<RegisterPetResponse>  registerPet(@RequestHeader("X-User-Id") Integer memberId,
                                                                @RequestPart(value = "requestDto") RegisterPetRequest request,
                                                                @RequestPart(value = "profileImage", required = false) MultipartFile profileImage){
        return ApiUtils.success(petServiceFacade.registerPet(request, profileImage, memberId));
    }

    @PostMapping(value = "/ocr", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiUtils.ApiResult<OcrCheckResponse> ocrCheck(@RequestHeader("X-User-Id") Integer memberId,
                                                         @RequestPart(value = "ocrImage", required = false) MultipartFile ocrImage){
        return ApiUtils.success(petServiceFacade.ocrCheck(memberId, ocrImage));
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
    public ApiUtils.ApiResult<ModifyPetResponse> modifyPet(@RequestHeader("X-User-Id") Integer memberId,
                                                           @PathVariable Integer petId,
                                                           @RequestPart(value = "requestDto") ModifyPetRequest request,
                                                           @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) {
        return ApiUtils.success(petServiceFacade.modifyPet(request, profileImage, petId , memberId));
    }


    @PostMapping("/{petId}/walks")
    public ApiUtils.ApiResult<RegisterWalkResponse> registerWalk(@RequestHeader("X-User-Id") Integer memberId, @PathVariable Integer petId, @RequestBody RegisterWalkRequest request){
        return ApiUtils.success(petServiceFacade.registerWalk(request, petId, memberId));
    }

    @GetMapping("/walks/{walkId}")
    public ApiUtils.ApiResult<SearchWalkResponse> searchWalk(@PathVariable Integer walkId){
        return ApiUtils.success(petServiceFacade.searchWalk(walkId));
    }

    @GetMapping("/walks")
    public ApiUtils.ApiResult<SearchWalkListResponse> searchMyWalkList(@RequestHeader("X-User-Id") Integer memberId){
        return ApiUtils.success(petServiceFacade.searchMyWalkList(memberId));
    }

    @GetMapping("/{petId}/walks")
    public ApiUtils.ApiResult<SearchWalkListResponse> searchWalkListByPet(@PathVariable Integer petId){
        return ApiUtils.success(petServiceFacade.searchWalkListByPet(petId));
    }

    @GetMapping("/walks/member/{memberId}")
    public ApiUtils.ApiResult<SearchWalkListResponse> searchWalkListByMember(@PathVariable Integer memberId){
        return ApiUtils.success(petServiceFacade.searchWalkListByMember(memberId));
    }


    @GetMapping("/{petId}/walks/inMonth")
    public ApiUtils.ApiResult<SearchWalkListResponse> searchWalkInMonthByPet(@PathVariable Integer petId){
        return ApiUtils.success(petServiceFacade.searchWalkInMonthByPet(petId));
    }

    @PostMapping("/admin")
    public List<FetchPetInfoResponse> fetchPetInfoList(@RequestBody Set<Integer> petIds) {
        return petServiceFacade.fetchPetInfoList(petIds);
    }



}
