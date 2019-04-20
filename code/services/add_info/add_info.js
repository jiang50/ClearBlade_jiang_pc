function add_info(req, resp) {
  log("Our request object is: "+JSON.stringify(req["params"]["body"]));
  log(req["params"]["body"])
  
  var info = JSON.parse(req["params"]["body"]);
  ClearBlade.init({request:req});

  var collection = ClearBlade.Collection({collectionName:"pc_info"});
  var power = true;
  if (info.power_plugged == 0) {
      power = false;
  }

  var newRow = {
        time: info.time,
        vm_percent: info.vm_percent,
        battery_percent: info.battery_percent,
        secsleft: info.secsleft,
        power_plugged: power
        
    };
  var callback = function(err, data) {
      if (err) {
          resp.error(data);
      } else {
          resp.success(JSON.stringify(newRow));
      }
  };
  collection.create(newRow, callback);
}
