# Lightning-Paginator
Component that wraps aura:iteration and split it to pages

Example of using this component:
```
<c:Paginator elementsPerPage="5">

          <aura:iteration items="{!v.accounts}" var="account" indexVar="i">

                    <--Your body-->
                                          
          </aura:iteration>
```
</c:Paginator>
