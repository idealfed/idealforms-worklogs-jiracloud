package com.idealfed.forms.repositories;

import com.idealfed.forms.model.Version;
import org.springframework.data.repository.CrudRepository;
import com.idealfed.forms.model.FormSet;

import java.util.List;

public interface VersionRepository extends CrudRepository<Version, Long> {

    Version findById(long id);
    List<Version> findAllByOrderByIdDesc();

    List<Version> findAllByCustomerKeyOrderByIdDesc(String customerKey);

}