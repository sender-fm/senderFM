<?php 
    header('Content-type: text/html; charset=UTF-8');
    
    date_default_timezone_set('Europe/Berlin'); 
    // ini_set("display_errors", 1);
    // error_reporting(E_ALL);

   require_once('setup.php');
    //echo "POST=> ";
    //var_dump($_POST);
 
    // $_POST["base64"];
    // $_POST["filename"];
    // $_POST["filetype"];
    // $_POST["filezise"];
  



# ========================================================================#
   #  Requires : Requires PHP5, GD library.
   #  Usage Example:
   #                     include("resize_class.php");
   #                     $resizeObj = new resize('images/cars/large/input.jpg');
   #                     $resizeObj -> resizeImage(150, 100, 0);
   #                     $resizeObj -> saveImage('images/cars/large/output.jpg', 100);
   # ========================================================================#


        class resize
        {
            // *** Class variables
            private $image;
            private $width;
            private $height;
            private $imageResized;

            function __construct($fileName)
            {
                // *** Open up the file
                $this->image = $this->openImage($fileName);

                // *** Get width and height
                $this->width  = imagesx($this->image);
                $this->height = imagesy($this->image);
            }

            ## --------------------------------------------------------

            private function openImage($file)
            {
                // *** Get extension
                $extension = strtolower(strrchr($file, '.'));

                switch($extension)
                {
                    case '.jpg':
                    case '.jpeg':
                        $img = @imagecreatefromjpeg($file);
                        break;
                    case '.gif':
                        $img = @imagecreatefromgif($file);
                        break;
                    case '.png':
                        $img = @imagecreatefrompng($file);
                        break;
                    default:
                        $img = false;
                        break;
                }
                return $img;
            }

            ## --------------------------------------------------------

            public function resizeImage($newWidth, $newHeight, $option="auto")
            {
                // *** Get optimal width and height - based on $option
                $optionArray = $this->getDimensions($newWidth, $newHeight, $option);

                $optimalWidth  = $optionArray['optimalWidth'];
                $optimalHeight = $optionArray['optimalHeight'];


                // *** Resample - create image canvas of x, y size
                $this->imageResized = imagecreatetruecolor($optimalWidth, $optimalHeight);
                imagecopyresampled($this->imageResized, $this->image, 0, 0, 0, 0, $optimalWidth, $optimalHeight, $this->width, $this->height);


                // *** if option is 'crop', then crop too
                if ($option == 'crop') {
                    $this->crop($optimalWidth, $optimalHeight, $newWidth, $newHeight);
                }
            }

            ## --------------------------------------------------------

            private function getDimensions($newWidth, $newHeight, $option)
            {

               switch ($option)
                {
                    case 'exact':
                        $optimalWidth = $newWidth;
                        $optimalHeight= $newHeight;
                        break;
                    case 'portrait':
                        $optimalWidth = $this->getSizeByFixedHeight($newHeight);
                        $optimalHeight= $newHeight;
                        break;
                    case 'landscape':
                        $optimalWidth = $newWidth;
                        $optimalHeight= $this->getSizeByFixedWidth($newWidth);
                        break;
                    case 'auto':
                        $optionArray = $this->getSizeByAuto($newWidth, $newHeight);
                        $optimalWidth = $optionArray['optimalWidth'];
                        $optimalHeight = $optionArray['optimalHeight'];
                        break;
                    case 'crop':
                        $optionArray = $this->getOptimalCrop($newWidth, $newHeight);
                        $optimalWidth = $optionArray['optimalWidth'];
                        $optimalHeight = $optionArray['optimalHeight'];
                        break;
                }
                return array('optimalWidth' => $optimalWidth, 'optimalHeight' => $optimalHeight);
            }

            ## --------------------------------------------------------

            private function getSizeByFixedHeight($newHeight)
            {
                $ratio = $this->width / $this->height;
                $newWidth = $newHeight * $ratio;
                return $newWidth;
            }

            private function getSizeByFixedWidth($newWidth)
            {
                $ratio = $this->height / $this->width;
                $newHeight = $newWidth * $ratio;
                return $newHeight;
            }

            private function getSizeByAuto($newWidth, $newHeight)
            {
                if ($this->height < $this->width)
                // *** Image to be resized is wider (landscape)
                {
                    $optimalWidth = $newWidth;
                    $optimalHeight= $this->getSizeByFixedWidth($newWidth);
                }
                elseif ($this->height > $this->width)
                // *** Image to be resized is taller (portrait)
                {
                    $optimalWidth = $this->getSizeByFixedHeight($newHeight);
                    $optimalHeight= $newHeight;
                }
                else
                // *** Image to be resizerd is a square
                {
                    if ($newHeight < $newWidth) {
                        $optimalWidth = $newWidth;
                        $optimalHeight= $this->getSizeByFixedWidth($newWidth);
                    } else if ($newHeight > $newWidth) {
                        $optimalWidth = $this->getSizeByFixedHeight($newHeight);
                        $optimalHeight= $newHeight;
                    } else {
                        // *** Sqaure being resized to a square
                        $optimalWidth = $newWidth;
                        $optimalHeight= $newHeight;
                    }
                }

                return array('optimalWidth' => $optimalWidth, 'optimalHeight' => $optimalHeight);
            }

            ## --------------------------------------------------------

            private function getOptimalCrop($newWidth, $newHeight)
            {

                $heightRatio = $this->height / $newHeight;
                $widthRatio  = $this->width /  $newWidth;

                if ($heightRatio < $widthRatio) {
                    $optimalRatio = $heightRatio;
                } else {
                    $optimalRatio = $widthRatio;
                }

                $optimalHeight = $this->height / $optimalRatio;
                $optimalWidth  = $this->width  / $optimalRatio;

                return array('optimalWidth' => $optimalWidth, 'optimalHeight' => $optimalHeight);
            }

            ## --------------------------------------------------------

            private function crop($optimalWidth, $optimalHeight, $newWidth, $newHeight)
            {
                // *** Find center - this will be used for the crop
                $cropStartX = ( $optimalWidth / 2) - ( $newWidth /2 );
                $cropStartY = ( $optimalHeight/ 2) - ( $newHeight/2 );

                $crop = $this->imageResized;
                //imagedestroy($this->imageResized);

                // *** Now crop from center to exact requested size
                $this->imageResized = imagecreatetruecolor($newWidth , $newHeight);
                imagecopyresampled($this->imageResized, $crop , 0, 0, $cropStartX, $cropStartY, $newWidth, $newHeight , $newWidth, $newHeight);
            }

            ## --------------------------------------------------------

            public function saveImage($savePath, $imageQuality="100")
            {
                // *** Get extension
                $extension = strrchr($savePath, '.');
                   $extension = strtolower($extension);

                switch($extension)
                {
                    case '.jpg':
                    case '.jpeg':
                        if (imagetypes() & IMG_JPG) {
                            imagejpeg($this->imageResized, $savePath, $imageQuality);
                        }
                        break;

                    case '.gif':
                        if (imagetypes() & IMG_GIF) {
                            imagegif($this->imageResized, $savePath);
                        }
                        break;

                    case '.png':
                        // *** Scale quality from 0-100 to 0-9
                        $scaleQuality = round(($imageQuality/100) * 9);

                        // *** Invert quality setting as 0 is best, not 9
                        $invertScaleQuality = 9 - $scaleQuality;

                        if (imagetypes() & IMG_PNG) {
                             imagepng($this->imageResized, $savePath, $invertScaleQuality);
                        }
                        break;

                    // ... etc

                    default:
                        // *** No extension - No save.
                        break;
                }

                imagedestroy($this->imageResized);
            }


            ## --------------------------------------------------------

        }


    $base64_image_string = $_POST["base64"];  
      
    $splited = explode(',', substr( $base64_image_string , 5 ) , 2);
    $mime=$splited[0];
    $data=$splited[1];

    $mime_split_without_base64=explode(';', $mime,2);
    $mime_split=explode('/', $mime_split_without_base64[0],2);
    if(count($mime_split)==2)
    {
        $extension=$mime_split[1];
        if($extension=='jpeg')$extension='jpg';
      
        $zufall = zufallsstring(35);
        $output_file_with_extension=$zufall.'.'.$extension;
    }
    $sql = 'SELECT `filenameDB` FROM `archiv` ';
      $sql .= ' WHERE `f_filetitle` = "'.$_POST["filename"].'" AND `form_user_id` = '.$_SESSION["id"].'';   
    $erg0 =  sql_db($sql, "SELECT");
   if ( $erg0 == "" ){


    $filesize = file_put_contents( "../archiv/". $output_file_with_extension, base64_decode($data) ); 
     
    $sql= 'INSERT INTO `archiv` ( `f_filetitle`, `f_filetyp`, `f_filemedium`, `f_fileformat`, `form_user_id`, `filenameDB`, `f_size`) VALUES ';
    $sql.=' ("'.$_POST['filename'].'","image","image/'.$extension.'","'.$extension.'",'.$_SESSION["id"].',"'.$output_file_with_extension.'","'.$filesize.'")';
    $erg =  sql_db($sql, "INSERT");

    $json[] = ['id' => $erg, 'name' =>   $output_file_with_extension];
    $json = json_encode($json, JSON_PRETTY_PRINT);
 
    $resizeObj_200  = new resize("../archiv/". $output_file_with_extension);
    $resizeObj_800  = new resize("../archiv/". $output_file_with_extension);
   
    $resizeObj_200 -> resizeImage(200, 400, 'auto');
    $resizeObj_800 -> resizeImage(800, 1000, 'auto' );
 
    $resizeObj_200 -> saveImage("../archiv/thumb_". $output_file_with_extension, 80);
    $resizeObj_800 -> saveImage("../archiv/800_". $output_file_with_extension, 80);

 
            echo    $json;
      
   } else {
       
         $json[] = ['id' => 0, 'name' =>   $erg0];
    $json = json_encode($json, JSON_PRETTY_PRINT);
 echo $json;
       
   }
            /*
            getimagesize() alle Eigenschaften eines Bildes auslesen
            $image_attributes[0] => Breite des Bildes in Pixeln
            $image_attributes[1] => Höhe des Bildes in Pixeln
            $image_attributes[2] => Enthält einen numerischen Wert für den Bildtyp. (siehe Konstanten)
            $image_attributes[3] => Enthält einen String für die Verwendung in HTML, leider für CSS nicht verwendbar.
            $image_attributes[‘mime‘] => Enthält den MIME-Type des Bildes laut RFC.
            $image_attributes[‘channels‘] => Enthält die Anzahl der Farbkanäle (also z.B. wieviel Bytes ein Pixel beansprucht).
            $image_attributes[‘bits‘] => Enthält die Anzahl der Bits pro Farbkanal.*/

      ?>

