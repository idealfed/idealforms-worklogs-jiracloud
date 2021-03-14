package com.idealfed.forms.repositories;


import com.idealfed.forms.model.IftFormSet;
import com.idealfed.forms.model.IftVersion;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IftVersionRepository extends CrudRepository<IftVersion, Long> {

    IftVersion findById(long id);
    List<IftVersion> findByIftFormSet(IftFormSet fs);

}