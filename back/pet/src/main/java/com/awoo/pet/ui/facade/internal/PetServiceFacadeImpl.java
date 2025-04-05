package com.awoo.pet.ui.facade.internal;

import com.awoo.pet.application.*;
import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.walk.Walk;
import com.awoo.pet.ui.facade.PetServiceFacade;
import com.awoo.pet.ui.facade.dto.request.ModifyPetRequest;
import com.awoo.pet.ui.facade.dto.request.RegisterPetRequest;
import com.awoo.pet.ui.facade.dto.request.RegisterWalkRequest;
import com.awoo.pet.ui.facade.dto.response.*;
import com.awoo.pet.ui.facade.internal.mapper.PetResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Set;


@Component
@RequiredArgsConstructor
public class PetServiceFacadeImpl implements PetServiceFacade {

    private final RegisterPetService registerPetService;
    private final SearchPetService searchPetService;
    private final ModifyPetService modifyPetService;
    private final SearchPetListService searchPetListService;
    private final RegisterWalkService registerWalkService;
    private final SearchWalkService searchWalkService;
    private final SearchWalkListService searchWalkListService;
    private final SearchWalkInMonthService searchWalkInMonthService;
    private final PetResponseMapper mapper;

    @Override
    public RegisterPetResponse registerPet(final RegisterPetRequest request, final MultipartFile profileImage, final Integer memberId) {
        Pet pet = registerPetService.registerPet(request.toCommand(memberId, profileImage));
        return mapper.registerPet(pet);
    }

    @Override
    public SearchPetListResponse searchPetList(final Integer memberId) {
        List<Map<String, Object>> pets = searchPetListService.searchPetList(memberId);
        return mapper.searchPetList(pets);
    }

    @Override
    public SearchPetResponse searchPet(final Integer petId) {
        Map<String, Object> petInfo = searchPetService.searchPet(petId);
        return mapper.searchPet(petInfo);
    }

    @Override
    public ModifyPetResponse modifyPet(final ModifyPetRequest modifyPetRequest,
                                       final MultipartFile profileImage,
                                       final Integer petId, final Integer memberId) {
        Pet modifyEntity = modifyPetService.modifyPet(modifyPetRequest.toCommand(profileImage, petId));
        return mapper.modifyPet(modifyEntity);
    }

    @Override
    public RegisterWalkResponse registerWalk(final RegisterWalkRequest request, final Integer petId,  final Integer memberId) {
        Integer walkId = registerWalkService.registerWalk(request.toCommand(petId, memberId));
        Walk entity = searchWalkService.searchWalk(walkId);
        return mapper.registerWalk(entity);
    }

    @Override
    public SearchWalkResponse searchWalk(final Integer walkId) {
        Walk entity = searchWalkService.searchWalk(walkId);
        return mapper.searchWalk(entity);
    }

    @Override
    public SearchWalkListResponse searchMyWalkList(final Integer memberId) {
        List<Walk> walks = searchWalkListService.searchWalkListByMember(memberId);
        return mapper.searchWalkList(walks);
    }

    @Override
    public SearchWalkListResponse searchWalkListByPet(final Integer petId){
        Map<String, Object> petInfo = searchPetService.searchPet(petId);
        Pet pet = (Pet)petInfo.get("pet");
        List<Walk> walks = searchWalkListService.searchWalkListByPet(pet.getPetId());
        return mapper.searchWalkList(walks);
    }

    @Override
    public SearchWalkListResponse searchWalkListByMember(final Integer memberId) {
        List<Walk> walks = searchWalkListService.searchWalkListByMember(memberId);
        return mapper.searchWalkList(walks);
    }

    @Override
    public SearchWalkListResponse searchWalkInMonthByPet(final Integer petId) {
        List<Walk> walks = searchWalkInMonthService.searchWalkInMonth(petId);
        return mapper.searchWalkList(walks);
    }

    public List<FetchPetInfoResponse> fetchPetInfoList(Set<Integer> petIds) {
        return searchPetListService.fetchPetInfoList(petIds);
    }
}
