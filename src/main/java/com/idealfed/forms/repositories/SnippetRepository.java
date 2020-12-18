package com.idealfed.forms.repositories;

import com.idealfed.forms.model.Form;
import com.idealfed.forms.model.FormSet;
import com.idealfed.forms.model.Snippet;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SnippetRepository extends CrudRepository<Snippet, Long> {

    Snippet findById(long id);
    List<Snippet> findByFormSet(FormSet fs);

}