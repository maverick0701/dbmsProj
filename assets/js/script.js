$('#box').click(function(e)
{
    e.preventDefault();
    let encryptType=$('#encrypt').val();
    console.log(encryptType,'567890987654567890');
    if(encryptType=='Naor')
    {
        url="./space.jpg"
        console.log(url);
        $('#encryptionBox').addClass('addBack2')
    }
    else if(encryptType=='otp')
    {
        $('#encryptionBox').addClass('addBack4')
    }
    else
    {
        $('#encryptionBox').addClass('addBack3')
    }
})
$('#box1').click(function(e)
{
    e.preventDefault();
    let encryptType=$('#encrypt1').val();
    console.log(encryptType,'567890987654567890');
   
    if(encryptType=='otp')
    {
        console.log('hello')
        $('#encryptionBox2').addClass('addBack22')
    }
    
})

$('#box2').click(function(e)
{
    e.preventDefault();
    let encryptType=$('#encrypt2').val();
    console.log(encryptType,'567890987654567890');
   
    if(encryptType=='aes')
    {
        console.log('hello')
        $('#encryptionBox3').addClass('addBack32')
    }
    
})
  


$('#box3').click(function(e)
{
    e.preventDefault();
    let encryptType=$('#encrypt3').val();
    console.log(encryptType,'567890987654567890');
   
    if(encryptType=='aes')
    {
        console.log('hello')
        $('#encryptionBox4').addClass('addBack42')
    }
    
})

$('#box4').click(function(e)
{
    e.preventDefault();
    let encryptType=$('#encrypt4').val();
    console.log(encryptType,'567890987654567890');
   
    if(encryptType=='otp')
    {
        console.log('hello')
        $('#encryptionBox5').addClass('addBack52')
    }
    
})
  




  