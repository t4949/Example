--CREATE TABLE Orders
--(
--O_Id int NOT NULL PRIMARY KEY,
--OrderNo int NOT NULL,
--P_Id int FOREIGN KEY REFERENCES Persons(P_Id)
--)
use [systemfault]
create table tUsers  
(
iUserId int NOT NULL PRIMARY KEY,
nvUserName nvarchar(50) NOT NULL,
iUserPermission int NOT NULL,
)
create table tMessagess
(
iMessageId int NOT NULL PRIMARY KEY,
iMessageFrom int FOREIGN KEY REFERENCES tUsers(iUserId), 
iMessageTo int FOREIGN KEY REFERENCES tUsers(iUserId),
nvMessageContent nvarchar(max),
)
create table tPniot
(
iPniaId int NOT NULL PRIMARY KEY,
--iPniaIp int 
iPniaPone int FOREIGN KEY REFERENCES tUsers(iUserId),
iPniaMetapel int FOREIGN KEY REFERENCES tUsers(iUserId),
--PniaKind מתוך רשימה
nvPniaDescription varchar(max),
PniaDate datetime,
nvPniaPrintScreen nvarchar(max),
--PniaStatues מתוך רשימה
--אגף קומה חדר וכו'
--מספר שלוחה בטלפון

)
create table tHistoryPniot
(
iHistoryPniaId int NOT NULL PRIMARY KEY,
iHistoryPniaPone int FOREIGN KEY REFERENCES tUsers(iUserId),
iHistoryPniaMetapel int FOREIGN KEY REFERENCES tUsers(iUserId),
HistoryPniaKind int ,--קישור לרשימה
nvHistoryPniaDescription varchar(max),
HistoryPniaDate datetime,
nvHistoryPniaPrintScreen nvarchar(max),
--HistoryPniaStatues מתוך רשימה

)
create table tTaalichPniot
(
iTaalichPniatId int PRIMARY KEY,
iPniaId int FOREIGN KEY REFERENCES tPniot(iPniaId),
TaalichPniaDate datetime,
iTaalichPniaPone int FOREIGN KEY REFERENCES tUsers(iUserId), 
iTaalichPniaMetapel int FOREIGN KEY REFERENCES tUsers(iUserId), 
nvTaalichPniaContent nvarchar(max),
)
create table tSysTable
(
iSysTableId int PRIMARY KEY,
nvSysTableName nvarchar(50),
)
create table tSysTableRow
(
iSysTableRowId int PRIMARY KEY,
iSysTableId  int FOREIGN KEY REFERENCES tSysTable(iSysTableId), 
nvSysTableRowName  nvarchar(50)
)