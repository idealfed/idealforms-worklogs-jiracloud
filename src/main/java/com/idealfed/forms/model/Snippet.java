package com.idealfed.forms.model;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.nio.charset.StandardCharsets;

@Entity
public class Snippet {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String name;

    @Type(type="org.hibernate.type.BinaryType")
    @Column(length=20971520)
    private byte[] settings;

    @Type(type="org.hibernate.type.BinaryType")
    @Column(length=20971520)
    private byte[] snippet;
    private String comment;

    @ManyToOne
    private FormSet formSet;

    protected Snippet(){}
    public Snippet(String name, byte[] snippet, String comment, FormSet formSet) {

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
    public byte[] getSnippet(){
        return this.snippet;
    };
    public void setSnippet(byte[] snippet){
        this.snippet=snippet;
    };

    public String getComment(){
        return this.comment;
    };
    public void setComment(String comment){
        this.comment=comment;
    };

}