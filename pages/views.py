from django.views.generic import TemplateView


# Create your views here.
class DashboardView(TemplateView):
    template_name = "home.html"


class AttendanceView(TemplateView):
    template_name = "attendance.html"


class StudentsView(TemplateView):
    template_name = "students.html"


class ReportsView(TemplateView):
    template_name = "reports.html"


class SettingsView(TemplateView):
    template_name = "settings.html"
