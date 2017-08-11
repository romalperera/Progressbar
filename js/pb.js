  // getting the values using ajax from file 
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    
                    var data = JSON.parse(this.responseText);

                    btn1.innerHTML = data.buttons[0];
                    btn1.setAttribute("value", data.buttons[0]);

                    btn2.innerHTML = data.buttons[1];
                    btn2.setAttribute("value", data.buttons[1]);

                    btn3.innerHTML = data.buttons[2];
                    btn3.setAttribute("value", data.buttons[2]);

                    btn4.innerHTML = data.buttons[3];
                    btn4.setAttribute("value", data.buttons[3]);  
                    
                    
                    // genrate dynamic bars using for loop 

                    for (var i = 0; i < data.bars.length; i++)
                    {
                        var progress = document.createElement("div");
                        var cont = document.getElementById("content");
                        cont.appendChild(progress);
                        progress.setAttribute("class", "Progressbar");
                        progress.setAttribute("id", "progress" + i);

                        var bar = document.createElement("div");
                        progress.appendChild(bar);
                        bar.setAttribute("class", "colorbar");
                        bar.setAttribute("id", "mybar" + i);
                        bar.style.width = data.bars[i] + "%";


                        var lb = document.createElement("label");
                        bar.appendChild(lb);
                        lb.setAttribute("class", "clabel");
                        lb.setAttribute("id", "label" + i);
                        lb.innerHTML = data.bars[i] + "%";
                    }

                    var ddl = document.createElement("select");                  
                    var but = document.getElementById("sel");
                    but.appendChild(ddl);
                    ddl.setAttribute("id", "ddselect");
                   
                // populating dropdown based on bars length
                    for (var i = 0; i < data.bars.length; i++)
                    {
                        var opt = document.createElement("option");
                        ddl.appendChild(opt);
                        opt.setAttribute("id", "ddl" + i);
                        opt.setAttribute("value", i);
                        opt.innerHTML = "progessbar " + (1+i);
                    }

                }
           
      };
            // passing current value of button on click event 
            btn1.addEventListener('click', function () {
                addwidth(this.value);
            });
            btn2.addEventListener('click', function () {
                addwidth(this.value);
            });
            btn3.addEventListener('click', function () {
                addwidth(this.value);
            });
            btn4.addEventListener('click', function () {
                addwidth(this.value);
            });
            
            // function for filling bar by passing value
            function addwidth(value)
            {
               // if dropdown select value is 0,1,2,3 based on that change the bar value
             
                var v = parseInt(document.getElementById("ddselect").value);
                var a = document.getElementById("label"+v).innerHTML;
                                
               // add current value of bar + button current value of selected bar
                value = parseInt(value) + parseInt(a);

               // if value is greater than 100 & above change the color red            
                if (value >= 100)
                {

                    document.getElementById("mybar"+v).style.backgroundColor = "red";
                    document.getElementById("mybar"+v).style.width = "100%";
                    document.getElementById("label"+v).innerHTML = value + "%";                   
                } 
                //if value is less than 100 and greater than 0 than select same bluecolor;
                 else if (value <= 100 && value > 0)
                {
                    document.getElementById("mybar"+v).style.backgroundColor = "#364de4";
                    document.getElementById("mybar"+v).style.width = value + "%";
                    document.getElementById("label"+v).innerHTML = value + "%";
                } 
                // if value is less than or equal to 0 than set value and with of bar equal to 0
                  else if (value <= 0)
                {
                    document.getElementById("mybar"+v).style.width = "0%";
                    document.getElementById("label"+v).innerHTML = "0%";

                } 
            }
         
            // ajax method for get file from sever 
            xhttp.open("GET", "http://pb-api.herokuapp.com/bars");
            xhttp.send();

