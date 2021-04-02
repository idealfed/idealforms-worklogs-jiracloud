package com.idealfed.forms.model;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class IftFormSet {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String name;
    @Column(length = 3500)
    private String description;
    private String productId;

    protected IftFormSet(){}

    public IftFormSet(String name, String description, String productId)
    {
        this.name = name;
        this.description = description;
        this.productId=productId;
    }
    public IftFormSet(String name)
    {
        this.name = name;
    }
    public Long getId(){
        return this.id;
    }

    public String getName()
    {
        return this.name;
    };
    public void setName(String name){
        this.name=name;
    };

    public String getProductId()
    {
        return this.productId;
    };
    public void setProductId(String productId){
        this.productId=productId;
    };


    public String getDescription()
    {
        return this.description;
    };
    public void setDescription(String description){
        this.description=description;
    };

    @OneToMany(targetEntity=IftVersion.class, mappedBy = "iftFormSet")
    private List<IftVersion> versions = new ArrayList<IftVersion>();
    public List<IftVersion> getVersions(){
        return this.versions;
    }


}