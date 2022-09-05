/* since creating a new Date object returns the time and date info from wherever the
server is, the date needs to be converted into Eastern Standard Time.
Once it is converted, the time will reflect the time in NEW YORK at page load.
This is whats used to calculate the color mode and alpha value.
*/

function updateTime(){
    var server_now = new Date();

    var UTC_hour = server_now.getUTCHours();
    server_now.setHours(UTC_hour-4);
    if(UTC_hour-4 < 0){
        server_now.setDate(server_now.getDate()+1);
    }
    var NY_now = new Date(server_now);
    var startOfDay = new Date(NY_now);
    startOfDay.setUTCHours(4, 0, 0, 0);

    var endOfDay = new Date(NY_now);
    endOfDay.setUTCHours(27, 59, 59, 999);
    return [NY_now, startOfDay, endOfDay]
}