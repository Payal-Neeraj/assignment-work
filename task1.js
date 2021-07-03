
            //upload image code
            const canvas=document.getElementById('inputCanvas');
            const ctx=canvas.getContext('2d');

            const reader=new FileReader();  
            const img=new Image();

            const uploadImage=(e)=>{
                reader.onload = () =>{
                    img.onload = () =>{
                        canvas.width=img.width;     //make image width and height to canvas dimension 
                        canvas.height=img.height;
                        ctx.drawImage(img,0,0);
                    };
                    img.src=reader.result;
                };
                reader.readAsDataURL(e.target.files[0]);       //read data by url
            };
            const imageLoader=document.getElementById('imageInput');
            imageLoader.addEventListener('change', uploadImage );


            //resize image using opencv module
            function resize(){
                let src = cv.imread('inputCanvas');
                let dst = new cv.Mat();
                const height=parseInt(document.getElementById('height').value);
                const width=parseInt(document.getElementById('width').value);
                let dsize = new cv.Size(width, height);
                // You can try more different parameters
                cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
                cv.imshow('outputCanvas', dst);
                src.delete(); dst.delete();
            }
        
            //Download image
            function download(){
                var canvas=document.getElementById('outputCanvas');
                var image = canvas.toDataURL();  
    
                // create temporary link  
                var tmpLink = document.createElement( 'a' );  
                tmpLink.download = 'image.png'; // set the name of the download file 
                tmpLink.href = image;  
            
                // temporarily add link to body and initiate the download  
                document.body.appendChild( tmpLink );  
                tmpLink.click();  
                document.body.removeChild( tmpLink );
            }