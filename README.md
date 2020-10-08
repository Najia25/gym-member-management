# gym-member-management
## Project demo
https://gym.najiaafrin.com/

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

This system will help the gym owners to keep track of the gym members and member's payments. The owner can also track which staff has added how many new members in a specific time period to measure employee performance. The system will have two types of user:  
    1. Admin  
    2. Manager  
## 'Admin' type user will be able to perform following tasks:  
    1. Add new member  
    2. Take payment  
    3. Approve pending member/payment added by the manager or himself  
    4. Generate employee reference report to check which employee.manager has added how many users  
    5. Add/Edit/Delete manager  
    6. Edit individual member profile  
    7. Print receipt after adding a new member or payment  
    8. See payment history of a gym member  
## 'Manager' type user will be able to add following tasks:  
    1. Add new member  
    2. Take payment  
    3. Edit individual member profile  
    4. Print receipt after adding a new member or payment  
    5. See payment history of a gym member  
Homepage is similar for both admin and manager. In homepage, member list will be shown based on their validity. Validity is determined based on their payment expiry date. If a user's expiration date is over for 7 days then he is no longer shown in homepage. User list in homepage is color coded based on validity. Following colors are used to represent a user's validity status:  
    1. Green: Expire date > 7 days  
    2. Yellow: Expire date <= 7 days but > 0 days  
    3. Red: If expire date is over.  
