var express = require("express");
var app = express();
var mysql = require("mysql");
app.use(express.json());
var cors = require("cors");
app.use(cors());
const otpGenerator = require("otp-generator");
var nodemailer = require("nodemailer");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "lotterydrum",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});

app.post("/uservalidate", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  console.log(req.body);
  let sql =
    "select id,txtFname,refUserRole from tblusers where txtUemail='" +
    username +
    "' and txtUpassword='" +
    password +
    "';";
  console.log("sql", sql);
  con.query(sql, (err, result) => {
    if (result != "") {
      console.log(result);
      res.send(result);
    } else {
      console.log(result);

      res.send("User doesn't exist");
    }
  });
});

app.post("/insertuser", (req, res) => {
  let fname = req.body.fname;
  let lname = req.body.lname;
  let uname = req.body.uname;
  let password = req.body.password;

  let sql =
    "insert into tblusers (txtFname,txtLname,txtUpassword,txtUemail) values('" +
    fname +
    "','" +
    lname +
    "','" +
    password +
    "','" +
    uname +
    "')";
  con.query(sql, (err, result) => {
    res.send(result);
  });
});

app.post("/otpgenerate", async (req, res) => {
  let id = req.body.newid;
  let email = "";
  console.log(id);
  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  let sql = await ("update tblusers set txtOtp='" +
    otp +
    "' where id ='" +
    id +
    "';");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("sql", sql);
  });
  let sql1 = await ("select txtUemail,txtOtp from tblusers where id='" +
    id +
    "';");
  con.query(sql1, (err, result) => {
    res.send(result);
  });
});
app.post("/sendmail", (req, res) => {
  let otp = req.body.otp;
  let email = req.body.email;
  console.log("email ois", req.body);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "archanacs154@gmail.com",
      pass: "ixeebzxtnirvxogh",
    },
  });

  var mailOptions = {
    from: "archanacs154@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: "Your OTP is " + otp,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send(otp);
  });
});

app.post("/verify", (req, res) => {
  let otp = req.body.otp;
  let id = req.body.id;
  let sql = "select txtOtp from tblusers where id='" + id + "'; ";
  con.query(sql, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/confirmuser", (req, res) => {
  let id = req.body.id;
  let sql = "update tblusers set txtDeleteflag=1 where id='" + id + "';";
  con.query(sql, (err, result) => {
    res.send(result);
  });
});

app.post("/drawticket", (req, res) => {
  let sql =
    "SELECT tm.id ,tm .txtLotteryname as main_ltry ,tb.id as sub_id,tb.txtLotteryname as sub_ltry ,tm.txtFirstprize, date_format( tm.dtLotterydrawdate,'%Y-%m-%d') as drawdate,date_format(tb.dtLotterydrawdate,'%Y-%m-%d') as sub_drawdate from tbllotterymaster tm left join tbllotterymaster tb on tm.txtSubLottery=tb.id WHERE tm.dtLotterydrawdate > NOW()ORDER BY tm.dtLotterydrawdate LIMIT 1; ";
  con.query(sql, (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.post("/unitcheckout", (req, res) => {
  let id = req.body.id;
  let sql =
    "SELECT tblunit.id as id ,tbllotterymaster.txtLotteryname as Lotteryname,DATE_FORMAT(tbllotterymaster.dtLotterydrawdate,'%M- %d-%Y')as Drawdate,tblunit.txtFirstchoicenumber as Firstnumber,tblunit.txtSecondchoicenumber as Secondnumber,tblunit.txtThirdchoicenumber as Thirdnumber,tblunit.txtFourthchoicenumber as Fourthnumber,tblunit.txtFifthoicenumber as Fifthnumber,tbllotterymaster.txtCost as Price FROM tbllotterymaster JOIN tblunit on tbllotterymaster.id=tblunit.refLotterymaster JOIN tblusers on tblusers.id=tblunit.refUser where tblusers.id='" +
    id +
    "' and tblunit.txtDeleteflag=0";
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
app.post("/unitdelete", (req, res) => {
  let sql = "UPDATE tblunit SET txtDeleteflag=3 where id=" + req.body.id + ";";
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
    console.log(sql)
  });
});
app.post("/checkouttotal", (req, res) => {
  let sql =
    "SELECT tblunit.id as id,sum(tbllotterymaster.txtCost) as Totalcost FROM tbllotterymaster JOIN tblunit on tbllotterymaster.id=tblunit.refLotterymaster JOIN tblusers on tblusers.id=tblunit.refUser where tblusers.id=1 and tblunit.txtDeleteflag=0";
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/Unitsold", (req, res) => {
  let sql =
    "select ustable.Lotterymaster,ustable.DrawDate as DrawDate,ustable.UnitSold,uctable.UnitConfirmed,(ustable.UnitSold-uctable.UnitConfirmed) as UnitPending from (SELECT lm.txtLotteryname AS Lotterymaster,DATE_FORMAT(lm.dtLotterydrawdate, '%M-%d-%Y') AS DrawDate,COUNT(ut.id) AS UnitConfirmed FROM tbllotterymaster lm  JOIN tblunit ut ON ut.refLotterymaster = lm.id where ut.txtUpdateflag = 1 AND ut.txtDeleteflag = 0 GROUP BY lm.txtLotteryname ORDER BY drawdate ASC) as uctable join (SELECT lm.txtLotteryname AS Lotterymaster,DATE_FORMAT(lm.dtLotterydrawdate, '%M-%d-%Y') AS DrawDate,COUNT(ut.id) AS Unitsold FROM tbllotterymaster lm JOIN tblunit ut ON ut.refLotterymaster = lm.id where ut.txtDeleteflag = 0 GROUP BY lm.txtLotteryname ORDER BY drawdate ASC) as ustable group by ustable.Lotterymaster"

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
app.post("/Unitlist", (req, res) => {
  let sql =
    "SELECT tblunit.id AS Unitid,CONCAT(tblusers.txtFname ,' ',tblusers.txtLname) AS Name,tblusers.txtUemail as Email,tblunit.txtFirstchoicenumber AS Firstnumber,tblunit.txtSecondchoicenumber AS Secondnumber,tblunit.txtThirdchoicenumber AS Thirdnumber,tblunit.txtFourthchoicenumber AS Fourthnumber,tblunit.txtFifthoicenumber AS Fifthnumber,tbllotterymaster.txtLotteryname as Lotteryname,DATE_FORMAT(tblunit.txtPurchaseddate, '%M %d %Y') as datepurchased,tblunit.txtDeleteflag as deleted,tblunit.txtUpdateflag as Status,tblunit.txtUpdatedBy,tblunit.dtUpdatedOn FROM tbllotterymaster JOIN tblunit ON tbllotterymaster.id = tblunit.refLotterymaster JOIN tblusers ON tblunit.refUser = tblusers.id where tblunit.txtUpdateflag=0 and tblunit.txtDeleteflag=0 order by datepurchased desc";

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/Unitpasstolottery", (req, res) => {
  let sql = "UPDATE tblunit SET dtUpdatedOn = 1 WHERE tblunit.id=1";

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
app.post("/addlottery", (req, res) => {
  let lotteryname = req.body.lotteryname;
  let drawdate = req.body.drawdate;
  let lotteryprize = req.body.lotteryprize;
  let ticketcost = req.body.ticketcost;
  let userid = req.body.userid;

  console.log(req.body);
  let sql =
    "insert into tbllotterymaster (txtLotteryname,dtLotterydrawdate,txtLotteryprize,txtCost,txtCreatedBy,txtCreatedOn) values('" +
    lotteryname +
    "','" +
    drawdate +
    "'," +
    lotteryprize +
    "," +
    ticketcost +
    ",'admin',curdate())";

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/lotteryfetch", (req, res) => {
  console.log(req.body);
  let sql =
    "select id, txtLotteryname as lotteryname ,date_format(dtLotterydrawdate,'%y-%m-%d') as drawdate,txtLotteryprize as Prizemoney ,txtUpdatedBy,dtUpdatedOn,txtDeleteflag  from tbllotterymaster where txtDeleteflag =0";

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
app.post("/lotterydelete", (req, res) => {
  let id = req.body.id;
  // let userid = req.body.userid;
  console.log(req.body);
  let sql =
    "UPDATE tbllotterymaster SET txtDeleteflag = 1,txtUpdatedBy = 'admin',dtUpdatedOn = CURDATE() WHERE tbllotterymaster.id = '" +
    id +
    "'";

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/addnewbank", (req, res) => {
  let acctowner = req.body.acctowner;
  let accno = req.body.accno;
  let bankname = req.body.bankname;
  let branch = req.body.branch;
  let ifsc = req.body.ifsc;
  let buserid = req.body.buserid;
  var sql =
    "insert into tblbankdetails (txtAccountowner, txtAccountnumber,txtBankname, txtBranch, txtIfsc, refUser) values ('" +
    acctowner +
    "', '" +
    accno +
    "', '" +
    bankname +
    "', '" +
    branch +
    "', '" +
    ifsc +
    "', '" +
    buserid +
    "');";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/viewbank", (req, res) => {
  var sql =
    "SELECT txtBankname FROM lotterydrum.tblbankdetails where refUser=1;";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/Lotterylist", (req, res) => {
  let sql =
    "SELECT lm.txtLotteryname AS Lotterymaster, COUNT(ut.id)  AS Unitsold FROM tbllotterymaster lm JOIN tblunit ut ON ut.refLotterymaster = lm.id GROUP BY lm.txtLotteryname HAVING Unitsold > 1";

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

/* ******************************************** API for adding unit selected ******************************************************** */
// app.post("/insertunit", (req, res) => {
//   var fnum=req.body.firstnum;
//   console.log(req.body);
//   var secnum=req.body.secondnum;
//   var thirdnum=req.body.thirdnum;
//   var fournum=req.body.fournum;
//   var fivenum=req.body.fifthnum;
//   var id=req.body.id;

//   let sql =
//     "insert into  tblunit(txtFirstchoicenumber,txtSecondchoicenumber,txtThirdchoicenumber,txtFourthchoicenumber,txtFifthoicenumber,refUser,refLotterymaster,txtPurchaseddate,txtDeleteflag)values('"+fnum+"','"+secnum+"','"+thirdnum+"','"+fournum+"','"+fivenum+"','"+id+"',1,CURDATE(),0);";
//   con.query(sql, (err, result) => {
//     // console.log(sql)
//     if (err) throw err;
//     console.log(result);
//     res.send(result);
//   });
// });

app.post("/insertunit", (req, res) => {
  let arr = req.body.arr;
  let val = JSON.stringify(arr);
  console.log("val", val);
  let uid = req.body.uid;
  let lid = req.body.lid;
  var sql =
    "insert into tblunit(refUser,refLotterymaster,txtLotteryNumber) values ('" +
    uid +
    "','" +
    lid +
    "',?)";
  console.log(sql);
  con.query(sql, val, function (err, result) {
    if (err) res.send("Error");
    console.log("Number of records inserted: " + result.affectedRows);
    res.send(result);
  });
});

//--------------winner------------------//

app.post("/winners", (req, res) => {
  var sql = "select count(id) as winnners from tblunit;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//---------------ticketlist---------------//

app.post("/tickets", (req, res) => {
  var iduser = req.body.userid;
  var sql =
    "select count(id) as number from tblunit where txtPurchaseddate=curdate() && refUser='" +
    iduser +
    "';";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//------------------userprofileedit---------------//

app.post("/profile", (req, res) => {
  let userid = req.body.userid;
  var sql =
    "select tu.txtFname,tu.txtLname,tu.txtUemail,tu.txtaddress,td.txtDistrict,tc.txtCountryname,ts.txtStatename from tblusers tu left join tbldistrict td on td.id=tu.refDistrict left join tblstate ts on ts.id=td.refStateid left join tblcountry tc on tc.id=ts.refCountryid where tu.id='" +
    userid +
    "';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("sql to fetch profile", sql);
    console.log(result);
    res.send(result);
  });
});

app.post("/fetchcity", (req, res) => {
  var sql = "SELECT TD.id,TD.txtDistrict FROM tbldistrict TD;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/profileupdate", (req, res) => {
  let userid = req.body.userid;
  let mobile = req.body.phone;
  let address = req.body.useraddress;
  let city = req.body.city;
  var sql =
    "update tblusers set txtUphoneno ='" +
    mobile +
    "',txtaddress='" +
    address +
    "',refDistrict='" +
    city +
    "' where tblusers.id='" +
    userid +
    "';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//-----------------userpasswordedit--------------//

app.post("/updatepassword", (req, res) => {
  let userid = req.body.userid;
  let newpassword = req.body.password;
  var sql =
    "update tblusers set txtUpassword='" +
    newpassword +
    "' where tblusers.id='" +
    userid +
    "';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
app.post("/showpassword", (req, res) => {
  let userid = req.body.userid;
  var sql =
    "select TU.id,TU.txtUpassword from tblusers TU where  TU.id='" +
    userid +
    "';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

/* ***************************************************Filter bar API'S****************************************************************** */

app.post("/search_date", (req, res) => {
  let date = req.body.date;
  let sql =
    "select txtFirstchoicenumber,txtSecondchoicenumber,txtThirdchoicenumber,txtFourthchoicenumber,txtFifthoicenumber from tblunit where txtPurchaseddate='" +
    date +
    "'";
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

/********************************************************************** by Vishu Provider Page ************************************************************************************************************* */

app.post("/viewprovider", (req, res) => {
  var sql =
    "SELECT * FROM lotterydrum.tblunit;SELECT id, txtProvidername,txtEmail,txtContactnumber,txtRegisteredaddress,txtZipcode,refState FROM lotterydrum.tblprovider;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/editprovider", (req, res) => {
  let providereditid = req.body.providereditid;
  let providereditname = req.body.providereditname;
  let providereditemail = req.body.providereditemail;
  let providereditnumber = req.body.providereditnumber;
  let providereditaddress = req.body.providereditaddress;
  let providereditzip = req.body.providereditzip;
  let providereditcity = req.body.providereditcity;
  var sql =
    "UPDATE tblprovider SET txtProvidername = '" +
    providereditname +
    "', txtEmail = '" +
    providereditemail +
    "', txtContactnumber = '" +
    providereditnumber +
    "', txtRegisteredaddress = '" +
    providereditaddress +
    "', txtZipcode = '" +
    providereditzip +
    "', refCity = '" +
    providereditcity +
    "' WHERE id='" +
    providereditid +
    "';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/deleteprovider", (req, res) => {
  let providereditid = req.body.providereditid;
  var sql = "DELETE FROM tblprovider WHERE id='" + providereditid + "';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/addprovider", (req, res) => {
  let providername = req.body.providername;
  let provideremail = req.body.provideremail;
  let providermobile = req.body.providermobile;
  let provideraddress = req.body.provideraddress;
  let providerzipcode = req.body.providerzipcode;
  let providercity = req.body.providercity;

  var sql =
    "INSERT INTO tblprovider (txtProvidername, txtEmail, txtContactnumber, txtRegisteredaddress, txtZipcode, refCity) VALUES ('" +
    providername +
    "', '" +
    provideremail +
    "', '" +
    providermobile +
    "', '" +
    provideraddress +
    "', '" +
    providerzipcode +
    "', '" +
    providercity +
    "');";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

/***********************************************************************By Vidya  Add lottery ********************************************************************************** */

//--------------------ADD LOTTERY--------------------- //
app.post("/addlottery", function (req, res) {
  let lotteryname = req.body.lotteryname;
  let lotterydate = req.body.lotterydate;
  let lotteryprize = req.body.lotteryprize;
  let lotterycost = req.body.lotterycost;
  let lotterystatus = req.body.lotterystatus;
  let lotterystart = req.body.lotterystart;
  let lotteryend = req.body.lotteryend;
  let lotteryselection = req.body.lotteryselection;
  let lotterypurchase = req.body.lotterypurchase;
  let lotterysub = req.body.lotterysub;
  var sql =
    "insert into tbllotterymaster(txtLotteryname,dtLotterydrawdate,txtLotteryprize,txtCost,txtStartRange,txtEndRange,txtSelectionLimit,txtPurchaseLimit,txtSubLottery) values('" +
    lotteryname +
    "','" +
    lotterydate +
    "','" +
    lotteryprize +
    "','" +
    lotterycost +
    "','" +
    lotterystart +
    "','" +
    lotteryend +
    "','" +
    lotteryselection +
    "','" +
    lotterypurchase +
    "','" +
    lotterysub +
    "');";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//--------------------ADD LOTTERY PROVIDER----------------------//
app.post("/addlotteryproviderfetch", function (req, res) {
  var sql = "SELECT id, txtProvidername FROM tblprovider;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
//--------------------ADD LOTTERY EXISTING----------------------//
app.post("/addlotteryexist", function (req, res) {
  let refProvider = req.body.refProvider;
  var sql =
    "select id,txtLotteryname from tbllotterymaster where refProvider='" +
    refProvider +
    "';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//--------------------ADD LOTTERY EXISTING DETAILS--------------------- //

app.post("/addlotterydetails", function (req, res) {
  let id = req.body.id;
  var sql =
    "select dtLotterydrawdate,txtFirstprize,txtCost,txtStartRange,txtEndRange,txtSelectionLimit,txtPurchaseLimit,txtSubLottery from tbllotterymaster where id = '" +
    id +
    "';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//-------------------------EDIT LOTTERY--------------------------//

app.post("/editlottery", function (req, res) {
  let id = req.body.id;
  let drawdate = req.body.drawdate;
  let prize = req.body.prize;
  let cost = req.body.cost;
  let start = req.body.start;
  let end = req.body.end;
  let selection = req.body.selection;
  let purchase = req.body.purchase;
  let sublottery = req.body.sublottery;
  var sql =
    "UPDATE tbllotterymaster SET dtLotterydrawdate='" +
    drawdate +
    "',txtLotteryprize= '" +
    prize +
    "',txtCost='" +
    cost +
    "',txtStartRange='" +
    start +
    "',txtEndRange='" +
    end +
    "',txtSelectionLimit='" +
    selection +
    "',txtPurchaseLimit='" +
    purchase +
    "',txtSubLottery='" +
    sublottery +
    "' WHERE id = '" +
    id +
    "';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//------------------------SUB LOTTERY--------------------------//

app.post("/sublottery", function (req, res) {
  let id = req.body.id;
  let sublottery = req.body.sublottery;
  var sql =
    "UPDATE tbllotterymaster SET txtRaffleid='1',txtSubLottery='" +
    sublottery +
    "' WHERE id = '" +
    id +
    "';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//-----------------------LOTTERY LIST------------------------//
app.post("/lotterylist", function (req, res) {
  var sql =
    "select txtLotteryname,dtLotterydrawdate,txtLotteryprize,txtCost from tbllotterymaster;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//-----------------------LOTTERY EXILE------------------------//
app.post("/lotteryexile", function (req, res) {
  var sql =
    "select txtLotteryname,dtLotterydrawdate from tbllotterymaster where dtLotterydrawdate < now();";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

/****************************************************By visakh Filter bar search *************************************************************************************** */

//------------userinfoforadmin--------------//

app.post("/userlistforadmin", (req, res) => {
  var sql =
    "select TUR.id,concat(TUR.txtFname,TUR.txtLname) as name,TUR.txtaddress,TLM.txtLotteryname,date_format(dtLotterydrawdate,'%Y-%m-%d') as lotterydrawdate,date_format(txtPurchaseddate,'%Y-%m-%d') as purchasedate from tblunit TU  join tblusers TUR on TU.refUser=TUR.id  join tbllotterymaster TLM on TU.refLotterymaster=TLM.id;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

/*********************************************************Archana =- Ticket Selector      ********************************************************************************************************************* */

app.post("/ticketselector_lotteryfetch", (req, res) => {
  let sql =
    "select tm.id ,tm .txtLotteryname as main_ltry ,tb.id as sub_id,tb.txtLotteryname as sub_ltry ,date_format(tm.dtLotterydrawdate ,'%Y-%m-%d') as drawdate from tbllotterymaster tm left join tbllotterymaster tb on tm.txtSubLottery=tb.id;";
  con.query(sql, (err, result) => {
    res.send(result);
    console.log(result);
  });
});


/****************************************************Archana Cart count *************************************************** */

app.post("/header_countunit", (req, res) => {
  let id = req.body.id;
  // let id=1;
  let sql =
    "select count(id) as count from tblunit where refuser='" +
    id +
    "' and txtDeleteflag=0";
  con.query(sql, (err, result) => {
    console.log(sql);
    res.send(result);
  });
});

/*********************************************Vishnu  winning uptodate ***************************************/
app.post("/totalwinnigtodate", (req, res) => {
  var sql =
    "SELECT txtProvidername, txtLotteryname, refProvider, sum(txtPrizemoney) as totalPrizemoney FROM lotterydrum.tblresultmap join tblunit on tblresultmap.refUnitid = tblunit.id join tbllotterymaster on tblunit.refLotterymaster = tbllotterymaster.id join tblprovider on tbllotterymaster.refProvider = tblprovider.id group by refProvider ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
// API for Totalwinningvalidation COMPONENT

app.post("/totallotterywinnigtodate", (req, res) => {
  var sql =
    "SELECT txtProvidername, txtLotteryname, txtPrizemoney, refProvider, sum(txtPrizemoney) AS totalPrizemoney FROM lotterydrum.tblresultmap join tblunit on tblresultmap.refUnitid = tblunit.id join tbllotterymaster on tblunit.refLotterymaster = tbllotterymaster.id join tblprovider on tbllotterymaster.refProvider = tblprovider.id group by txtLotteryname order by refProvider asc";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
//API for Totalwinningvalidation COMPONENT


app.post("/upcominglotterydraws", (req, res) => {
  var sql =
    "select id, txtLotteryname, txtCost ,date_format(dtLotterydrawdate,'%y-%m-%d') as drawdate,date_format(curdate(),'%y-%m-%d') as Today from tbllotterymaster where dtLotterydrawdate>curdate() order by drawdate";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
// test api

app.post("/tst",(req,res)=>{
  var sql="SELECT     txtProvidername,  txtLotteryname,  refProvider,SUM(txtPrizemoney) AS totalPrizemoney   FROM  tblresultmap m   JOIN  tblunit u ON m.refUnitid = u.id         JOIN  tbllotterymaster s ON u.refLotterymaster = s.id  JOIN  tblprovider p ON s.refProvider = p.id  group by p.id"
  con.query(sql,(err,result)=>
  {
    if(err)throw err
    console.log(result)
    res.send(result)
  })

})

app.post("/subltryfetch",(req,res)=>{
  let id=req.body.id
  var sql="SELECT tm.id ,tm .txtLotteryname as main_ltry ,tb.id as sub_id,tb.txtLotteryname as sub_ltry ,tm.txtFirstprize, date_format( tm.dtLotterydrawdate,'%Y-%m-%d') as drawdate  from tbllotterymaster tm left join tbllotterymaster tb on tm.txtSubLottery=tb.id WHERE tm.id='"+id+"'";
  con.query(sql,(err,result)=>
  {
    if(err)throw err
    console.log(result)
    res.send(result)
  })

})


app.post("/purchasedloryfetch",(req,res)=>{
  let sql="select tu.id ,tm.txtLotteryname,tu.txtLotteryNumber from tblunit tu left join tbllotterymaster tm on tu.refLotterymaster=tm.id where tu.refUser=2 and tu.txtDeleteflag=0 and tu.txtPurchaseddate < tm.dtLotterydrawdate;";
  con.query(sql,(err,result)=>{
    if(err)throw err;
    res.send(result)
    

  })

})
app.listen(8000, () => {
  console.log("listening on port");
});
