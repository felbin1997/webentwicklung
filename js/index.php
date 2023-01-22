<html>
<body>
<!--<?php
// Der Punkt steht für das Verzeichnis, in der auch dieses
// PHP-Programm gespeichert ist
$verzeichnis = ".";
echo "<ul>";

// Test, ob es sich um ein Verzeichnis handelt
if ( is_dir ( $verzeichnis ))
{
    // öffnen des Verzeichnisses
    if ( $handle = opendir($verzeichnis) )
    {
        // einlesen der Verzeichnisses
        while (($file = readdir($handle)) !== false)
        {
            echo "<li>";
            echo "<a href=/webentwicklung/js/\"$file\">$file</a>";
	    echo "</li>";
        }
        closedir($handle);
    }
}
echo "</ul>";
?>-->
<?php
// alle Dateien und Verzeichnisse aus Verzeichnis als Array
$verzeichnis = '.';     // aktuelles Verzeichnis
$verz_inhalt = scandir($verzeichnis, 1);

//rsort($verz_inhalt)

for($i=0; $i < count($verz_inhalt); $i++) {
if (substr($verz_inhalt[$i], 0 , 1) == ".") {
	echo "";
}
else {
	echo "<a href=/webentwicklung/js";
	echo $verz_inhalt[$i];
	echo ">$verz_inhalt[$i]</a>";
	echo "<br/>";
}
}
?>
</body>
</html>