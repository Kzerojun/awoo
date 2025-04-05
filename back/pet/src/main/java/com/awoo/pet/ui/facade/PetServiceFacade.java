package com.awoo.pet.ui.facade;

import com.awoo.pet.ui.facade.dto.request.ModifyPetRequest;
import com.awoo.pet.ui.facade.dto.request.RegisterPetRequest;
import com.awoo.pet.ui.facade.dto.request.RegisterWalkRequest;
import com.awoo.pet.ui.facade.dto.response.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface PetServiceFacade {

    RegisterPetResponse registerPet(final RegisterPetRequest registerPetRequest, final MultipartFile profileImage, final Integer memberId);

    SearchPetListResponse searchPetList(final Integer memberId);

    SearchPetResponse searchPet(final Integer petId);

    ModifyPetResponse modifyPet(final ModifyPetRequest modifyPetRequest, final MultipartFile profileImage, final Integer petId, Integer memberId);

    RegisterWalkResponse registerWalk(final RegisterWalkRequest registerWalkRequest, final Integer petId, final Integer memberId);

    SearchWalkResponse searchWalk(final Integer walkId);

    SearchWalkListResponse searchMyWalkList(final Integer memberId);

    SearchWalkListResponse searchWalkListByPet(final Integer petId);

    SearchWalkListResponse searchWalkListByMember(final Integer memberId);

    SearchWalkListResponse searchWalkInMonthByPet (final Integer petId);

    List<FetchPetInfoResponse> fetchPetInfoList(Set<Integer> petIds);
}
