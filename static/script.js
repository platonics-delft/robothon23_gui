const api_url = 'http://localhost:5000';
const button_template = document.getElementById('record_template');
const template_name = document.getElementById('template_name');

const button_behavior = document.getElementById('record_behavior');
const behavior_name = document.getElementById('behavior_name');

button_template.addEventListener('click', async _ => {
  try {     
    console.log(template_name.value)
    const response = await fetch(`${api_url}/record_template`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        name: template_name.value
      })
    });
    console.log('Completed!', response);
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});

button_behavior.addEventListener('click', async _ => {
  try {     
    console.log(behavior_name.value)
    const response = await fetch(`${api_url}/record_behavior`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        name: behavior_name.value
      })
    });
    console.log('Completed!', response);
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});


var skills = document.querySelectorAll(".skills");
var skill_order = [];

skills.forEach(function(checkbox) {
  checkbox.addEventListener("change", function() {
    if (this.checked) {
      var indicator = document.createElement("span");
      indicator.innerHTML = (skill_order.length + 1);
      indicator.className = "ml-2 text-gray-700 bg-gray-400 rounded-full h-6 w-6 flex items-center justify-center";
      this.parentElement.lastElementChild.appendChild(indicator);
      skill_order.push(this.id);
    } else {
      var index = skill_order.indexOf(this.id);
      if (index !== -1) {
        skill_order.splice(index, 1);
      }
      var label = this.parentElement.lastElementChild;
      label.removeChild(label.firstElementChild)
    }
    console.log(skill_order);
  });
});

