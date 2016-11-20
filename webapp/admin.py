from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Student, VisitorLog, StudentLog
# Register your models here.
# admin.site.register(Visitor)
def deactivate_account(modeladmin, request, queryset):
	queryset.update(active=False)
deactivate_account.short_description = "Deactivate"
def activate_account(modeladmin, request, queryset):
	queryset.update(active=True)
activate_account.short_description = "Activate"
class StudentAdmin(admin.ModelAdmin):
	list_per_page = 20
	list_display = ('first_name','last_name','student_number','created_on','active')
	list_display_links = ('first_name','last_name','student_number')
	search_fields = ['first_name','last_name','student_number']
	list_filter = ('created_on',)
	exclude = ('created_on',)
	actions = [deactivate_account,activate_account]
	def has_delete_permission(self, request, obj=None):
		return False
class VisitorAdmin(admin.ModelAdmin):
	actions = None
	list_per_page = 20
	search_fields = ['first_name','last_name','middle_name','designation','office','purpose','organization','time_in']
	list_display = ('first_name','last_name','time_in')
	list_display_links = ('first_name','last_name')
	list_filter = ('time_in',)
	readonly_fields = ('photo','first_name','last_name','middle_name','designation','office','purpose','organization','time_in','email')
	def has_delete_permission(self, request, obj=None):
		return False
	def has_add_permission(self, request, obj=None):
		return False
class StudentLogAdmin(admin.ModelAdmin):
	actions = None
	list_display = ('first_name','last_name','student_number','time_in')
	search_fields = ['first_name','last_name','student_number']
	list_filter = ('time_in',)
	readonly_fields = ('photo','first_name','last_name','student_number','time_in')
	def has_delete_permission(self, request, obj=None):
		return False
	def has_add_permission(self, request, obj=None):
		return False
	# def has_change_permission(self, request, obj=None):
	# 	return False
# class VisitorLogsAdmin(admin.ModelAdmin):
# 	list_display =('first_name','last_name')
# myModels = [StudentProfile,VisitorLog]
# admin.site.register(StudentAdmin,VisitorAdmin)

admin.site.register(Student,StudentAdmin)
admin.site.register(VisitorLog,VisitorAdmin)
admin.site.register(StudentLog,StudentLogAdmin)



# def has_add_permission(self, request, obj=None):
#     return True
# def has_change_permission(self, request, obj=None):
#     return True