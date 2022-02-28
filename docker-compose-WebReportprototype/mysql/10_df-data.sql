USE datafactory;

--
-- Dumping data for table `camera`
--

LOCK TABLES `camera` WRITE;
/*!40000 ALTER TABLE `camera` DISABLE KEYS */;
INSERT INTO `camera` VALUES (1,'OSIRIS','OSIRIS','OSIRIS','OSIRIS','/scidb/framedb/OSIRIS/',1),(2,'AG-NA','ASG','CCD_Kit/MagellanCCDController/ASG_NA','ASG_NA','/scidb/framedb/AG-NA/ASG/',1),(3,'AG-NA','SFS','CCD_Kit/MagellanCCDController/SFS_NA','SFS_NA','/scidb/framedb/AG-NA/SFS/',1),(4,'AG-NB','ASG','CCD_Kit/MagellanCCDController/ASG_NB','ASG_NB','/scidb/framedb/AG-NB/ASG/',1),(5,'AG-NB','SFS','CCD_Kit/MagellanCCDController/SFS_NB','SFS_NB','/scidb/framedb/AG-NB/SFS/',1),(6,'CANARICAM','CANARICAM','CANARICAM','CANARICAM','/scidb/framedb/CANARICAM/',1),(7,'ICARO','ICARO','ICARO','ICARO','/scidb/framedb/ICARO/',1);
/*!40000 ALTER TABLE `camera` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `observation_mode` WRITE;
/*!40000 ALTER TABLE `observation_mode` DISABLE KEYS */;
INSERT INTO `observation_mode` VALUES (1,'bias',7);
/*!40000 ALTER TABLE `observation_mode` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `reduction_result_data_config` WRITE;
/*!40000 ALTER TABLE `reduction_result_data_config` DISABLE KEYS */;
INSERT INTO `reduction_result_data_config` VALUES (1,1,'CCD-MODE','$.elements[0].value.path','CCD-MODE','STRING');
/*!40000 ALTER TABLE `reduction_result_data_config` ENABLE KEYS */;
UNLOCK TABLES;

 
 
