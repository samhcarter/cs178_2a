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
        start_temp = event.detail
        // ...
    }

    let updateEnd = (event) => {
        end_temp = event.detail
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

         /* toggle in label designing */
        .toggle {
            position : relative ;
            display : inline-block;
            width : 100px;
            height : 52px;
            background-color: yellow;
            border-radius: 30px;
            border: 2px solid gray;
        }
            
        /* After slide changes */
        .toggle:after {
            content: '';
            position: absolute;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: gray;
            top: 1px;
            left: 1px;
            transition:  all 0.5s;
        }
            
        /* Toggle text */
        p {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
        }
            
        /* Checkbox checked effect */
        .checkbox:checked + .toggle::after {
            left : 49px;
        }
            
        /* Checkbox checked toggle label bg color */
        .checkbox:checked + .toggle {
            background-color: green;
        }
            
        /* Checkbox vanished */
        .checkbox {
            display : none;
        }
    </style>
</head>

<h1>MY CALENDAR</h1>
<h2>Enter times you are available. Use the toggle to indicate "preferred" or "prefer not" and press submit when ready!</h2>
<h3>Click a spot on the clock to move the hand there!</h3>
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
    
    <input type="checkbox" id="switch"
                    class="checkbox" />
    <label for="switch" class="toggle">
    
</div>

<div>
    <button> Submit</button>
</div>


<!-- <a href="/">Home</a> -->