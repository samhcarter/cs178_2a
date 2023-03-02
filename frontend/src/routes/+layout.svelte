
<head>
    <style>
        nav {
          display: flex;
          flex-wrap: wrap;
        }
        nav a {
          text-decoration: none;
          display: block;
          padding: 15px 25px;
          text-align: center;
          background-color: rgb(189, 185, 185);
          color: #464141;
          margin: 0;
          font-family: sans-serif;
        }
        nav a:hover {
          background-color: #777777;
          color: #ffffff;
        }
      </style>
</head>

<nav>
    <a href="/">1) Update Name</a>
    <a href="/mycalendar">2) Update My Calendar</a>
    <a href="/groupcalendar">3) See Group Calendar</a>
  </nav>
  
  <slot></slot>