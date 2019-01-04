# Lightning-Paginator
Component that wraps aura:iteration and split it to pages

It finds only first aura:iteration tag, other aura:iteration tags would be ignored

Example of using this component:
```
<c:Paginator elementsPerPage="5">

          <aura:iteration items="{!v.accounts}" var="account" indexVar="i">

                    <!--Your body-->
                                          
          </aura:iteration>
          
</c:Paginator>
```
