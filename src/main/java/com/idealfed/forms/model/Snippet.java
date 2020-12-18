package com.idealfed.forms.model;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
public class Snippet {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String name;
    private String snippet;
    private String comment;

    @ManyToOne
    private FormSet formSet;

    protected Snippet(){}
    public Snippet(String name, String snippet, String comment, FormSet formSet) {

        this.name=name;
        this.snippet=snippet;
        this.comment=comment;
        this.formSet=formSet;
    }

    public Snippet(String name, FormSet formSet) {
        this.name=name;
        this.formSet=formSet;
    }
    public Long getId() {
        return this.id;
    }

    public FormSet getFormSet()
    {
        return this.formSet;
    };
    public void setFormSet(FormSet formSet)
    {
        this.formSet = formSet;
    };

    public String getName(){
        return this.name;
    };
    public void setName(String name){
        this.name=name;
    };

    //@StringLength(value=StringLength.UNLIMITED)
    public String getSnippet(){
        return this.snippet;
    };
    public void setSnippet(String snippet){
        this.snippet=snippet;
    };

    public String getComment(){
        return this.comment;
    };
    public void setComment(String comment){
        this.comment=comment;
    };

}