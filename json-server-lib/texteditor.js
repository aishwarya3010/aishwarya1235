"use strict";
var count=[0,0,0];
    var a;
    var div1;
    var para;
    var anchor;
    var div2;
    var img;
    var c;
    var posttime;
    
  
  $(document).ready(function(){
    $('.content').richText();
    $("#texteditor").hide();
    $("#filter").hide();
    //get data       
        $.ajax({
            // type: 'GET',
            type: 'GET',
            dataType: 'json',
         
            url: 'http://localhost:3333/blogdata',
            success: function(result){
               console.log(result);
                 a=result;
                console.log('response from server')
                $.each(result, function(i, record){     

                createDynamicgrid(record);
                $("#show").append(div1);
                  // let ab=record.content;
                  // console.log(ab.slice(0,9000));
                  //  c=ab.slice(0,100);
                  
                
                })                
            }
        });
        
          //create Dynamic grid
          function createDynamicgrid(record){
           
            div1 = document.createElement('div'); 
            div1.className="card mb-4";
            posttime = document.createElement('span'); 
            posttime.className="label label-success";
            posttime.innerText=record.timestamp;
            div1.append(posttime);
            img=document.createElement('img');
            img.src=record.imageurl;
            img.className="card-img-top";
            div1.append(img);

          div2=document.createElement('div');
            div2.className="card-title";
          para= document.createElement('p');
            para.className="card-text";
            
            para.id=record.id;
            para.innerHTML =record.content.slice(0,100);
            anchor = document.createElement('button');
            anchor.className="btn btn-danger";
            anchor.id="read"+record.id;

            anchor = document.createElement('a');
            anchor.className="btn btn-primary";
            anchor.id="read"+record.id;
            anchor.innerText="Read More....";
            div2.append(para);
            div2.append(anchor);                  
            div1.append(div2);
            let ids = record.id;                             
            console.log(anchor);
            console.log(div1);
            console.log(anchor);
          
            
          anchor.onclick= function getSpecificContent()
          {       
              if($("#read"+record.id).text()==="Read More....")
                    {
                    
                       readMore();
                    }
                    else{
                      $("#read"+record.id).text("Read More....");
                      $("#"+record.id).html(record.content.slice(0,100)); 
                    }
            }
           function readMore(){
           console.log('http://localhost:3333/blogdata/'+ids);      
            $.getJSON('http://localhost:3333/blogdata/'+ids,(data)=>{ 
          
           
            $("#"+record.id).html(data.content); 
            $("#read"+record.id).text("Read Less....");   
            });   
          }
        }
        //Category wise sorting 
        $(".categoryFilter").click(function(){  
         $("#show").hide();
         $("#filter").show();
          $("#filter").empty();
          let category=$(this).text();           
          alert(category);
          for(var i = 0; i < a.length; i++) {
                         
            if(a[i].category===category){

              $("#show").empty();
             createDynamicgrid(a[i]);
              $("#filter").append(div1); 
            
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
          var time= new Date($.now());
          var timestamp=time.getDate()+"-"+(time.getMonth()+1)+"-"+time.getFullYear()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();   
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
               "imageurl":$("#image").val(),
               "timestamp":timestamp
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
