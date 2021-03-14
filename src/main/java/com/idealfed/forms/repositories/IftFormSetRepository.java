package com.idealfed.forms.repositories;

import org.springframework.data.repository.CrudRepository;
import com.idealfed.forms.model.IftFormSet;
import java.util.List;

public interface IftFormSetRepository extends CrudRepository<IftFormSet, Long> {

    IftFormSet findById(long id);
}