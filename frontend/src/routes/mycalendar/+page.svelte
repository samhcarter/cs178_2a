<!-- Explore Later: Time Picker https://www.npmjs.com/package/svelte-time-picker -->
<!-- https://e-soa.com/svelte-time-picker/ -->

<script>
    import {TimePicker} from 'svelte-time-picker';

    // available_free = green, available_difficule = yellow
    let available_free = []
    let available_difficult = [] 

    function addAvailability() {
        
    }

    var start_temp;
    var end_temp;
    

    /* Callback */
    let updateStart = (event) => {
        let start_temp = event.detail
        // ...
    }

    let updateEnd = (event) => {
        let end_temp = event.detail
        // ...
    }
    

</script>

<head>
    <style>
        .float-container {
            border: 3px solid #fff;
            padding: 20px;
        }

        .float-child {
            width: 35%;
            float: left;
            padding: 20px;
            border: 2px solid green;
        }  
        .button {
            width: 10%
            
        }
    </style>
</head>

<h1>MY CALENDAR</h1>
<p>TODO...</p>

<div class="float-container">

    <div class="float-child">
        <div>
            <h3>start of availability block:</h3>
            <TimePicker on:change={updateStart} />
        </div>
    </div>
    
    <div class="float-child">
        <div>
            <h3>end of availability block:</h3>
            <TimePicker on:change={updateEnd} />
        </div>
    </div>
    
</div>

<div>
    <button> Submit</button>
</div>


<!-- <a href="/">Home</a> -->