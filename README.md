# Lightning-Paginator
Component that wraps aura:iteration and split it to pages

It finds only first aura:iteration tag, other aura:iteration tags would be ignored

Example of using this component:
```
<c:Paginator elementsPerPage="5">

          <aura:iteration items="{!v.accounts}" var="account" indexVar="i">

                    <c:AccountRecord account="{!account}"/>
 
          </aura:iteration>
          
</c:Paginator>
```
[![Paginator](https://github.com/leshchukandrej/Lightning-Paginator/blob/master/Paginator.png)](https://github.com/leshchukandrej/Lightning-Paginator/blob/master/Paginator.png)

You can use Paginator even with tables like in this example:
```
<c:Paginator elementsPerPage="5">

    <table>
        <thead>
            <!--Rows-->
        </thead>
        <tbody>
        
        <aura:iteration items="{!v.items}" var="item" indexVar="index">
            <!--Rows-->
        </aura:iteration>
        
        </tbody>
    </table>

</c:Paginator>
```

