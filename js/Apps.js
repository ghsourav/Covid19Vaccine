
$(document).ready(function () {
  //let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=723131&date=21-05-2021`

  let output = ""
  var pincode = ""
  $('.datepicker').datepicker({ "format": 'dd-mm-yyyy', "showDaysInNextAndPreviousMonths":'true' });

  $('.tooltipped').tooltip();


  $("#pincode").keyup(function () {
    let date = $("#date").val()
    pincode = $("#pincode").val()
    console.log(pincode.length)

    if (date.length != 12) {

      if (pincode.length == 6) {
        $("#search").removeClass("disabled")
        M.toast({ html: '6 Digit Pincode Correct Format', classes: 'green rounded' });

      }
      else {
        //  M.toast({ html: '6 Digit Pincode <br> To enable Seaech', classes: 'yellow rounded' });

      }
    }
    else {
      M.toast({ html: '! Please Enter Date First , Then Enter 6 Digit Pin  <br> To enable Seaech', classes: 'red rounded' });

    }
  })

  $("#search").click(function () {
    $(".responsive-table").removeClass("hide")
    pincode = $("#pincode").val()
    let date = $("#date").val()

    let url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pincode + "&date=" + date + " "
    console.log(pincode)
    $.ajax({
      url: url,
      dataType: 'json',
      success: function (data) {
        if (data.sessions) {
          x = data.sessions;
        } else {
          x = ""
        }

        for (i = 0; i < x.length; i++) {

          output += "<tr><td>" + x[i].name + "</td><td>" + x[i].address + "</td><td>" + x[i].block_name + "</td><td>" + x[i].district_name + "</td><td>" + x[i].date + "</td><td>" + x[i].from + "</td><td>" + x[i].to + "</td><td> ₹ " + x[i].fee + "</td><td class='vabl teal accent-3' >" + x[i].available_capacity + "</td><td>" + x[i].available_capacity_dose1 + "</td><td>" + x[i].available_capacity_dose2 + "</td><td class='red-text'><b>" + x[i].min_age_limit + "+ </b></td><td>" + x[i].vaccine + "</td> </tr>"
        }

        if (x.length != 0) {
          $("#devs").html(output)

          M.toast({ html: 'hooray! , ' + x.length + '  Vaccinetion center Found', classes: 'light-green darken-2 rounded' })
        } else {
          $(".hidden").html("<p class='center'>No Vaccinetion center Found on " + date + " & " + pincode + " 😓</p>")
          M.toast({ html: 'Sorry, No Vaccinetion center Found', classes: 'yellow rounded' });
        }
        $("#pindateinput").hide();
        $(".hidden").append("<a class='btn teal' style='margin:0 3%;'  onclick='window.location.reload(true)'>Search On New Date/ Pincode</a>")
        $(".pincode").html("<h6 class='container'>Showing Result of pin - " + pincode + " on date of " + date + " . " + x.length + "  Vaccinetion center Found .<br> All data provied by <b>CoWin</b>.Developed by <a href='https://twitter.com/ghsourav'>GhSourav</a></h6>")
      }
    });
  });
})

