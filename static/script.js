const api_url = 'http://localhost:5000';
const button1 = document.getElementById('load_tmuxp');
const button2 = document.getElementById('kill_tmuxp');
const button3 = document.getElementById('run_bt');
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


button1.addEventListener('click', async _ => {
  try {     
    const response = await fetch(`${api_url}/load_tmuxp`, {
      method: 'post',
      body: {
        // Your body
      }
    });
    console.log('Completed!', response);
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});

button2.addEventListener('click', async _ => {
  try {     
    const response = await fetch(`${api_url}/kill_tmuxp`, {
      method: 'post',
      body: {
        // Your body
      }
    });
    console.log('Completed!', response);
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});

button3.addEventListener('click', async _ => {
  try {     
    const response = await fetch(`${api_url}/run_bt`, {
      method: 'post',
      body: {
        // Your body
      }
    });
    console.log('Completed!', await response.json().data);
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});
