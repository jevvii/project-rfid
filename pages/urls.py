from django.urls import path
from .views import (
    DashboardView,
    AttendanceView,
    StudentsView,
    ReportsView,
    SettingsView,
)

urlpatterns = [
    path("attendance/", AttendanceView.as_view(), name="attendance"),
    path("students/", StudentsView.as_view(), name="students"),
    path("reports/", ReportsView.as_view(), name="reports"),
    path("settings/", SettingsView.as_view(), name="settings"),
    path("", DashboardView.as_view(), name="home"),
]
