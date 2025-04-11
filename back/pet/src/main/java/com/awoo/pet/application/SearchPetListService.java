package com.awoo.pet.application;

import com.awoo.pet.ui.facade.dto.response.FetchPetInfoResponse;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface SearchPetListService {

    List<Map<String, Object>> searchPetList(final Integer memberId);

    List<FetchPetInfoResponse> fetchPetInfoList(Set<Integer> petIds);
}
