package com.awoo.pet.ui.facade.internal;

import com.awoo.pet.application.ModifyPetService;
import com.awoo.pet.application.RegisterPetService;
import com.awoo.pet.application.SearchPetService;
import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.ui.facade.PetServiceFacade;
import com.awoo.pet.ui.facade.dto.request.ModifyPetRequest;
import com.awoo.pet.ui.facade.dto.request.RegisterPetRequest;
import com.awoo.pet.ui.facade.dto.response.ModifyPetResponse;
import com.awoo.pet.ui.facade.dto.response.RegisterPetResponse;
import com.awoo.pet.ui.facade.dto.response.SearchPetResponse;
import com.awoo.pet.ui.facade.internal.mapper.PetResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class PetServiceFacadeImpl implements PetServiceFacade {

    private final RegisterPetService registerPetService;
    private final SearchPetService searchPetService;
    private final ModifyPetService modifyPetService;
    private final PetResponseMapper mapper;

    @Override
    public RegisterPetResponse registerPet(final RegisterPetRequest request, final Integer memberId) {
        Integer petId = registerPetService.registerPet(request.toCommand(memberId));
        Pet entity = searchPetService.searchPet(petId);
        return mapper.registerPetResponse(entity);
    }

    @Override
    public SearchPetResponse searchPet(final Integer petId) {
        Pet entity = searchPetService.searchPet(petId);
        return mapper.searchPet(entity);
    }

    @Override
    public ModifyPetResponse modifyPet(ModifyPetRequest modifyPetRequest, Integer petId, Integer memberId) {
        //내 반려견인지 확인

        //반려견 정보 가져오고 확인 절차
        Pet entity = searchPetService.searchPet(petId);

        //받은 반려견 정보와 가져온 정보가 같으면
        Pet modifyEntity = modifyPetService.modifyPet(modifyPetRequest.toCommand(petId));

        return mapper.modifyPet(modifyEntity);
    }
}
