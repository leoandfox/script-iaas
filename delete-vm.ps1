param(
[string]$name
)
Connect-VIServer -Server vcenter.cloudis.lan -User administrator@vsphere.local -Password Supinfo2019!
Remove-VM -VM $name -Confirm:$false -DeletePermanently