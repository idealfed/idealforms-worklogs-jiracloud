package com.idealfed.forms.model;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class FormSet {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String name;
    private String projectId;
    private String projectName;
    private String settings;
    private String customerKey;
    private String iftFormGroup;
    private String iftFormGroupVersion;

    protected FormSet(){}

    public FormSet(String name, String projectId, String projectName, String settings, String customerKey, String iftFormGroup, String iftFormGroupVersion)
    {
        this.name = name;
        this.projectId = projectId;
        this.projectName = projectName;
        this.settings = settings;
        this.customerKey=customerKey;
        this.iftFormGroup=iftFormGroup;
        this.iftFormGroupVersion=iftFormGroupVersion;
    }
    public FormSet(String name)
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

    public String getIftFormGroup()
    {
        return this.iftFormGroup;
    };
    public void setIftFormGroup(String iftFormGroup){
        this.iftFormGroup=iftFormGroup;
    };

    public String getIftFormGroupVersion()
    {
        return this.iftFormGroupVersion;
    };
    public void setIftFormGroupVersion(String iftFormGroup){
        this.iftFormGroupVersion=iftFormGroupVersion;
    };

    public String getCustomerKey()
    {
        return this.customerKey;
    };
    public void setCustomerKey(String customerKey){
        this.customerKey=customerKey;
    };

    public String getProjectId()
    {
        return this.projectId;
    };
    public void setProjectId(String projectId){
        this.projectId=projectId;
    };

    public String getProjectName(){
        return this.projectName;
    }
    public void setProjectName(String projectName){
        this.projectName=projectName;
    };

    public String getSettings()
    {
        return this.settings;
    }
    public void setSettings(String settings){
        this.settings=settings;
    };

    @OneToMany(targetEntity=Snippet.class, mappedBy = "formSet")
    private List<Snippet> snippets = new ArrayList<Snippet>();
    public List<Snippet> getSnippets(){
        return this.snippets;
    }

    @OneToMany(targetEntity=Form.class, mappedBy = "formSet")
    private List<Form> forms = new ArrayList<Form>();
    public List<Form> getForms(){
        return this.forms;
    }



}