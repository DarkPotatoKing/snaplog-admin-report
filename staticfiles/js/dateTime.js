function date_time(id)
{
        date = new Date;
        year = date.getFullYear();
        month = date.getMonth();
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
        d = date.getDate();
        day = date.getDay();
        days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        h = date.getHours();
        h1 = h;
        mer = "AM";
        merValue = 1; //1 -> AM 0 -> PM
        if(h<10)
        {
                h = "0"+h;
        }
        m = date.getMinutes();
        if(m<10)
        {
                m = "0"+m;
        }
        s = date.getSeconds();
        if(s<10)
        {
                s = "0"+s;
        }
        if((h >= 1) && (h <= 11)){
                mer = "AM";
        }
        if((h >= 13) && (h <= 23)){
                mer = "PM";
                h1 = h-12;
        }
        if((h == 24) || (h == 0)){
                mer = "AM";
                h1 = 12;
        }
        if((h == 12)){
                mer = "PM";
        }

        result = ''+days[day]+' '+months[month]+' '+d+' '+year+' '+h1+':'+m+mer; //+':'+s;
        document.getElementById(id).innerHTML = result;
        setTimeout('date_time("'+id+'");','1000');
        return true;
}