<?php
$component = 'card';

$url = "https://bootstrap-vue.org/docs/components/${component}";
$path = "src/components/nodes/" . ucfirst($component) . ".vue";

$dom = new DOMDocument();
@$dom->loadHTMLFile($url);
$xpath = new DOMXPath($dom);

$lines = $xpath->query('//section[contains(.,"<b-' . $component . '>")]/article/h4[span[contains(., "Properties")]]/../div/table/tbody/tr');

$props = [];
foreach($lines as $line) {
  $columns = $line->getElementsByTagName('td');
  $name = $columns[0]->textContent;
  $name = trim(str_replace('Use with caution', '', $name));
  $type = trim($columns[1]->textContent);
  $description = $columns[3]->textContent;
  if ($type === 'String or Object or Array') {
    $type = 'String';
  }
  $props[$name] = [
    'type' => $type,
    'label' => $name,
    'description' => $description,
  ];
  if (substr($name, -8) === '-variant') {
    $props[$name]['component'] = 'Variant';
  }
  if ($name === 'align') {
    $props[$name]['autocomplete'] = ['left', 'center', 'rigth'];
  }
}

ksort($props);

$json_indented_by_4 = json_encode($props, JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT);
$json_indented_by_2 = preg_replace('/^(  +?)\\1(?=[^ ])/m', '$1', $json_indented_by_4); 
$res = preg_replace_callback('/"type": "(\w+)"/', function ($ma) {
  return '"type": ' . $ma[1];
}, $json_indented_by_2);
//echo $res, "\n";

$code = file_get_contents($path);
$newCode = preg_replace_callback(
  '/      props: [\w\W]+      slots:/',
  function($ma) use($res) {
    $res = str_replace("\n", "\n      ", $res);
    return "      props: $res,\n      slots:";
  },
  $code
);

file_put_contents($path, $newCode);
