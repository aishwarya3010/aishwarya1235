"use strict";
  $(document).ready(function(){
    $('.content').richText();
    var count=[0,0,0];
    var a;
    $("#texteditor").hide();
    $("#filter").hide();
    //get data       
        $.ajax({
            // type: 'GET',
            type: 'GET',
            dataType: 'json',
         
            url: 'http://localhost:3333/blogdata',
            success: function(result){
            //  console.log(result[0]);
                 a=result;
                console.log('response from server')
                $.each(result, function(i, record){                   
                  console.log(record);
                  let ab=record.content;
                  console.log(ab.slice(0,9000));
                  var c=ab.slice(0,100);
               
                 
                  let div1 = document.createElement('div'); 
                  div1.className="card mb-4";

                  let img=document.createElement('img');
                  img.src=record.imageurl;
                  img.className="card-img-top";
                  div1.append(img);

                  let div2=document.createElement('div');
                  div2.className="card-title";
                  let para= document.createElement('p');
                  para.className="card-text";
                  para.innerHTML = c;
                  var anchor = document.createElement('a');
                  anchor.className="btn btn-primary";
                  
                  anchor.innerText="Read More....";
                  div2.append(para);
                  div2.append(anchor);                  
                  div1.append(div2);
                  let ids = record.id;                             
                 console.log(anchor);
                 console.log(div1);
                 
                 $("#show").append(div1);  
                 anchor.onclick= function getSpecificContent()
                 {        if(anchor.innerText==="Read More....")
                          {
                            readMore();
                          }
                          else{
                            anchor.innerText="Read More....";
                            para.innerHTML=c;
                          }
                 
                               
                  }
                    function readMore(){
                     
                      console.log('http://localhost:3333/blogdata/'+ids);
                        $.getJSON('http://localhost:3333/blogdata/'+ids,(data)=>{
                          console.log(data.content);
                            para.innerHTML=data.content;
                            anchor.innerText="Read Less....";
                          });   
                    }

                })                
            }
        });
        $(".categoryFilter").click(function(){       
          let category=$(this).text();           
          alert(category);
          for(var i = 0; i < a.length; i++) {
                                   
            if(a[i].category===category){
               console.log(a[i]);  
            
              }             
        }
        })
        //create post window nevigation
        $("#createBlog").click(function(){
          alert("texteditor");
          $("#texteditor").show();
          $("#filter").hide();
          $(".container").hide();
          $("#createBlog").hide();
        })
        //post the blog
        $("#post").click(function(){     
          if($("#title").val()==="")
          {
            alert("Enter the title of blog");
          }   
          else{
            $.ajax({           
              type: 'POST',
              dataType: 'json',          
              url: 'http://localhost:3333/blogdata',
              data: {
               "content":$(".content").val(),
               "category":$("#category :selected").val(),
               "title":$("#title").val(),
               "imageurl":$("#image").val()
              } ,             
              dataType:'json',
              success: function(result){              
                  console.log('result');
              }                     
            })
            $("#texteditor").hide();
            $(".container").show();
          }     
          
        })
        
    
})
